Page({
    onReady: function (e) {
      // 使用 wx.createAudioContext 获取 audio 上下文 context
      this.audioCtx = wx.createAudioContext('myAudio')
    },
    data: {
      list: [{
				"src": "http://dl.stream.qqmusic.qq.com/C400001pcmyu36uUay.m4a?vkey=0EB637C9D80853FDCD95D1C11AC74AA0185228A8546911B725CB45BD3C5A5653A76F819E78F06244CFE385951D4AC487C26D360732290ABD&guid=8645456982&uin=0&fromtag=66",
				"name": "帝都",
				"img": "https://y.gtimg.cn/music/photo_new/T002R300x300M000000Hqm2N0vOPYg.jpg?max_age=2592000",
				"author": "萌萌哒天团",
				"id":"1"
			},
			{
				"src": "http://dl.stream.qqmusic.qq.com/C400002btSvp3AzWfA.m4a?vkey=66E97040C1D59327419A7B0800EBD86150B324A603D51F7374048BD905F174352C1B361DF89BE66C1E6D9B558AACFCBC1C7E084C08B78E84&guid=8645456982&uin=0&fromtag=66",
				"name": "相思赋予谁",
				"img": "https://y.gtimg.cn/music/photo_new/T002R300x300M0000002RAMa0egDrz.jpg?max_age=2592000",
				"author": "好妹妹乐队",
				"id":"2"
			},
			{
				"src": "http://dl.stream.qqmusic.qq.com/C400002gF0Op3ykIJv.m4a?vkey=36DD71E68564FBF912F77A1FABD136B2F5FCF8700EBA54B7CFE90888000CB011BFF8C594433DC9A0AB51AD2F7EF3AD586A1EF7AE88F20D22&guid=8645456982&uin=0&fromtag=66",
				"name": "一梦逍遥",
				"img": "https://y.gtimg.cn/music/photo_new/T002R300x300M000003scTYJ4Xhiwl.jpg?max_age=2592000",
				"author": "银临",
				"id":"3"
			},
			{
				"img": 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
				"name": '此时此刻',
				"author": '许巍',
				"src": 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
				"id":"4"
      },
      {
        "src": "http://dl.stream.qqmusic.qq.com/C400002uHTUs3V16l1.m4a?vkey=FD87025CF5C0D260DA917086139A116045554617235F726D9CB58AF4B89031B474E5564B435A9C990BDB946D4FF83BE385D021BD3D6B24AC&guid=8645456982&uin=0&fromtag=66",
				"name": "诀别诗",
				"img": "https://y.gtimg.cn/music/photo_new/T002R300x300M000002omcrg3nthyJ.jpg?max_age=2592000",
				"author": "胡彦斌",
				"id":"5"
      },
      {
        "src": "http://dl.stream.qqmusic.qq.com/C400001LuLtP1LqITK.m4a?vkey=07A1C1FA38022F8C64C50B8C8E7636D0661B7CEA1B8C9326D6D18BA18D5FD498008705CB01905BBBAC6E040F996FA0163BAD1C61C8EF2C94&guid=8645456982&uin=0&fromtag=66",
				"name": "庐州月",
				"img": "https://y.gtimg.cn/music/photo_new/T002R300x300M000002CJON012PxwU.jpg?max_age=2592000",
				"author": "许嵩",
				"id":"6"
      },
      {
        "src": "http://dl.stream.qqmusic.qq.com/C400003tOapB4aiTwv.m4a?vkey=B27EB1B2080EA730FD88AD3D5CD2F3D0512B14EBC551DF90CA80251B4FA870113460DE3D67843A244D171490B0A306C0ABD5C8DEAD0B1BED&guid=8645456982&uin=0&fromtag=66",
				"name": "半壶沙",
				"img": "https://y.gtimg.cn/music/photo_new/T002R300x300M0000009EZjm1c7iQe.jpg?max_age=2592000",
				"author": "刘珂矣",
				"id":"7"
      },
      {
        "src": "http://dl.stream.qqmusic.qq.com/C400001zIS6n40zn9D.m4a?vkey=446A1EA1A0FAC34A3038B2DA0E4DC31437641FF355FB5F80DB4CF38A20FEFDD527D49F503681DC523B6E168EEB5F285C1FCD8E85A9B2AA7F&guid=8645456982&uin=0&fromtag=66",
				"name": "不良人",
				"img": "https://y.gtimg.cn/music/photo_new/T002R300x300M000002kBSNg3xzYnr.jpg?max_age=2592000",
				"author": "河图",
				"id":"8"
      },
      {
        "src": "http://dl.stream.qqmusic.qq.com/C400004emQMs09Z1lz.m4a?vkey=B6437E1E0308FB76FA8971901F56B9AACFEFBB5C02639CE26C12A9EB7487D4A12D6944C9DED56CAF5E605433B847B23B554AB86ECC099AD2&guid=8645456982&uin=0&fromtag=66",
				"name": "烟花易冷",
				"img": "https://y.gtimg.cn/music/photo_new/T002R300x300M000000bviBl4FjTpO.jpg?max_age=2592000",
				"author": "周杰伦",
				"id":"9"
      },
      {
        "src": "http://dl.stream.qqmusic.qq.com/C400003d61fS3L53zD.m4a?vkey=78673D0223AB0AD5F1B98890EBA20251C221A5C37BEC212597ADD0ADF4D49085F79979BE8DA4C5A515F5B2C2D1D9F3FFF44FC4214A3185E6&guid=8645456982&uin=0&fromtag=66",
				"name": "风中的花瓣",
				"img": "https://y.gtimg.cn/music/photo_new/T002R300x300M000004dR0Xe1ws3sj.jpg?max_age=2592000",
				"author": "醉梦千城",
				"id":"10"
      }

    ],
    listItem:{
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    
    }
      },
    audioPlay: function () {
      this.audioCtx.play()
    },
    audioPause: function () {
      this.audioCtx.pause()
    },
    audio14: function () {
      this.audioCtx.seek(14)
    },
    audioStart: function () {
      this.audioCtx.seek(0)
    },
    playmusic:function(e){
      var that= this;
       console.log(e);
      that.setData({
         listItem:e.target.dataset.item
       })
    }
  })