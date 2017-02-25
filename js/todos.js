//模块
var app = angular.module('App',[]);
//控制器
app.controller('TodosCtrl',['$scope','$filter','$interval', function ($scope,$filter,$interval) {
    //标题
    $scope.cont = "todos";
    var upper = $filter('uppercase');
    $scope.title = upper($scope.cont);


    //给定参数标记
    var curTime = 'curTime',
        nowTime = 'nowTime';//每条事项的时间

    //获取时间
    function getTime(times){
        var now = new Date;
        //过滤器-格式化时间
        var time = $filter('date');
        $scope[times] = time(now,'yy-MM-dd HH:mm:ss');
        if(times == nowTime){
            return $scope[times];
        }
    }

    //底部时间显示
    getTime(curTime);
    $interval(function () {
        getTime(curTime);
    },1000);

    //初始化事项
    $scope.arrData = [];
    var _index = 0;

    //添加事项
    $scope.add = function () {
        var now = getTime(nowTime);
        this.arrData.push({text:this.msg,flag:false,id:_index++,nowTime:now});
        this.msg = '';
    };

    //删除
    $scope.des = function (index) {
        this.arrData.splice(index,1);
    };

    //完成事项
    $scope.finishData = [];
    //事件
    $scope.finish = function (index) {
        var done = this.arrData.splice(index,1)[0];//取出数组中的某一项
        done.flag = true;
        this.finishData.push(done);
    };

    //撤回事项
    $scope.back = function (index) {
        var back = this.finishData.splice(index,1)[0];
        back.flag = false;
        this.arrData.push(back);
        //按id进行排序
        for(var i = 0;i < this.arrData.length - 1;i++){
            for(var j = 0;j < this.arrData.length - 1 - i;j++){
                if(this.arrData[j].id > this.arrData[j+1].id){
                    var temp = this.arrData[j];
                    this.arrData[j] = this.arrData[j+1];
                    this.arrData[j+1] = temp;
                }
            }
        }
    };

    //删除某一事项
    $scope.del = function (index) {
        this.finishData.splice(index,1);
    };

    //清空所有事项
    $scope.clear = function () {
        //是否存在已完成事项
        if(this.finishData.length > 0){
            this.finishData.splice(0,this.finishData.length);
        }else{
            alert("无删除事项！");
        }
    }
}]);