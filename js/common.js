/*----- 表格公共方法 开始 -----*/
/**
 * 表格行移动
 * p.s. 复选框父节点必须是td
 * @param _status true上移，false下移。
 * @param _checkedTagName 要移动的复选框的Name
 */
function moveGoods(_status,_checkedTagName){
    let _checkedNodeList = $("input[name='" + _checkedTagName +"']:checked");
    if (_checkedNodeList.length == 1){
        if (_status){
            _moveUp(_checkedNodeList[0]);
            layer.msg("上移成功", {
                icon: 1,
                time: 2000,
            });
        }else{
            _moveDown(_checkedNodeList[0]);
            layer.msg("下移成功", {
                icon: 1,
                time: 2000,
            });
        }
    }else if (_checkedNodeList.length < 1){
        layer.msg("您未选中任何一行数据，无法移动！", {
            icon: 2,
            time: 2000,
        });
    }else{
        layer.msg("每次只能移动一行数据!", {
            icon: 3,
            time: 2000,
        });
    }
}

/**
 * 复选框全选
 * @param _elementId 全选复选框的Id
 * @param _elementTagName 其他复选框的Name
 */
function selectAll(_elementId,_elementTagName){
    var box = document.getElementById(_elementId);
    var loves = document.getElementsByName(_elementTagName);
    if(box.checked == false){
        for (var i = 0; i < loves.length; i++) {
            loves[i].checked = false;
        }
    }else{
        for (var i = 0; i < loves.length; i++) {
            loves[i].checked = true;
        }
    }
}

/**
 * 复制商品信息,支持多选择
 * @param _checkedTagName
 */
function copyGoods(_checkedTagName) {
    let _checkedNodeList = $("input[name='" + _checkedTagName +"']:checked");
    if (_checkedNodeList.length < 1){
        layui.layer.msg("您未选中任何一行数据，无法复制！", {
            icon: 2,
            time: 2000,
        });
    }else{
        for (let _i = 0 ; _i < _checkedNodeList.length ; _i++ ){
            // 复制该行信息
            let _copyHtml = _checkedNodeList[_i].parentNode.parentNode.cloneNode(true);
            let _tbody = $("#goodsMsgBody")[0]
            _tbody.appendChild(_copyHtml);
        }
        //取消所有复选框里的选中状态
        selectAllFalse('selectGoods')

        //重新计算价格
        sumAllMoney();

        //用户提示
        layui.layer.msg("复制成功！", {
            icon: 1,
            time: 2000,
        });
    }
}

/**
 * 指定复选框为全不选
 * @param _elementTagName
 */
function selectAllFalse(_elementTagName){
    var loves = document.getElementsByName(_elementTagName);
    for (var i = 0; i < loves.length; i++) {
        loves[i].checked = false;
    }
}

/**
 * 指定复选框为全选
 * @param _elementTagName
 */
function selectAllTrue(_elementTagName){
    var loves = document.getElementsByName(_elementTagName);
    for (var i = 0; i < loves.length; i++) {
        loves[i].checked = true;
    }
}

/**
 * 计算总页数
 * @param _showItemNum 每页显示个数
 * @param _allItemNum 总个数
 */
function calAllPageNum(_showItemNum , _allItemNum){
    // 向上整除
    let _result = Math.ceil(_allItemNum / _showItemNum);
    return _result == 0 ? 1 : _result
}

/**
 * 计算当前页
 * @param _startNum 起始个数
 * @param _showItemNum 每页显示个数
 * @returns {number} 当前页数
 */
function calCurPageNum( _startNum , _showItemNum){
    if(_startNum == 0){
        return 1
    }else {
        return Math.ceil((_startNum + _showItemNum) / _showItemNum)
    }
}

/**
 * 上下页
 * @param _upStatus 上下页状态，true为下一页
 * @param _startNum 起始数量
 * @param _showItemNum 每页显示个数
 * @param _allItemNum 总个数
 */
function upDownPage(_upStatus , _startNum , _showItemNum , _allItemNum , _tbodyName) {
    if (_upStatus){
        // 下一页
        if (_startNum >= _allItemNum){
            layer.msg("已经是最后一页!", {
                icon: 2,
                time: 2000,
            });
            return false
        }
    }else{
        // 上一页
        if (_startNum < 0){
            layer.msg("已经是第一页!", {
                icon: 2,
                time: 2000,
            });
            return false
        }
    }

    // 执行分页
    pageHide(_tbodyName , _startNum , _showItemNum)

    return true;
}

/*----- 表格公共方法 结束 -----*/

/*----- 数学方法 开始 -----*/

/*精度乘法*/
function accMul(arg1, arg2)
{
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

/*精度加法*/
function dcmAdd(arg1,arg2){

    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    return (accMul(arg1,m)+accMul(arg2,m))/m;
}

/*----- 数学方法 结束 -----*/



/*----- 内部方法 开始 -----*/

/*内部方法-表格行上移*/
function _moveUp(_a){
    var _row = _a.parentNode.parentNode;
    //如果不是第一行，则与上一行交换顺序
    var _node = _row.previousSibling;
    while(_node && _node.nodeType != 1){
        _node = _node.previousSibling;
    }
    if(_node){
        _swapNode(_row,_node);
    }
}

/*内部方法-表格行下移*/
function _moveDown(_a){
    var _row = _a.parentNode.parentNode;
    //如果不是最后一行，则与下一行交换顺序
    var _node = _row.nextSibling;
    while(_node && _node.nodeType != 1){
        _node = _node.nextSibling;
    }
    if(_node){
        _swapNode(_row,_node);
    }
}

/*内部方法-节点交换*/
function _swapNode(node1,node2){
    //获取父结点
    var _parent = node1.parentNode;
    //获取两个结点的相对位置
    var _t1 = node1.nextSibling;
    var _t2 = node2.nextSibling;
    //将node2插入到原来node1的位置
    if(_t1)_parent.insertBefore(node2,_t1);
    else _parent.appendChild(node2);
    //将node1插入到原来node2的位置
    if(_t2)_parent.insertBefore(node1,_t2);
    else _parent.appendChild(node1);
}

/**
 * 分页隐藏
 * @param _tbodyName 标签名
 * @param _startNum 起始个数
 * @param _showItemNum 每页显示个数
 */
function pageHide(_tbodyName , _startNum , _showItemNum) {
    $(_tbodyName).find("tr").each(function () {
        //首先全部显示
        $(this).show();

        //其次隐藏
        var v1 = $(this).children('th:eq(0)').text();
        if (v1 <= _startNum || v1 > _startNum + _showItemNum) {
            $(this).hide();
        }
    })
}
/*----- 内部方法 结束 -----*/