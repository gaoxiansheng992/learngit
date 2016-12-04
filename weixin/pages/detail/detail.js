var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
    data:{
        title:'话题详情',
        detail:{},
        hidden:false
    },
    onLoad:function(options){
        this.fetchData(options.id);
    },
    fetchData:function(id){
        var self=this;
        self.setData({
            hidden:false
        });
        wx.request({
          url: Api.getTopicByID(id, { mdrender: false }),
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            res.data.data.create_at=util.getDateDiff(new Date(res.data.data.create_at));
            res.data.data.replay=res.data.data.replies.map(function (item) {
                item.create_at = util.getDateDiff(new Date(item.create_at));
                return item;
            })
            self.setData({
                detail:res.data.data
            });
            setTimeout(function(){
                self.setData({
                    hidden: true
                });
            },300)
          }
          
        })
    }
})