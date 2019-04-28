export default {
  components: {},
  data() {
    return {
      
      // 机构信息
      goodsData:[
        {
            imgSrc:"static/jg1.png",
            title:"阿凡提智能辅导",
            stars:4,
            averge:"869",
            address:"西湖区 西溪银泰城",
            info:'杭州阿凡提智能辅导是杭州天目琴行旗下品牌...',
            hot:"18627",
            distance:"806m",
            phone:'0571-8735-6728',
            id:1
        },
        {
            imgSrc:"static/jg2.png",
            title:"CCtalk",
            stars:5,
            averge:"862",
            address:"江晖路1298号(龙湖天街、星光大道、中盈国际）",
            info:'杭州CCtalk智能辅导是杭州天目琴行旗下品牌...',
            hot:"18627",
            phone:'0571-8735-5423',
            distance:"806m",
            id:2
        }
    ],
    // 课程信息
    classData:[
      {
          imgSrc:"static/class1.png",
          banner:'https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 1x, https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 2x',
          title:"幼儿课程",
          stars:4,
          averge:"869",
          price:'1888',
          address:"西湖区 西溪银泰城",
          hot:"18627",
          distance:"806m",
          id:1,
          organId:1,
          introduce:'传统课程，刚开始接触就会教弹奏技巧，从中音do开始学习。“夏日奇缘”定制钢琴课，使用雅马哈母语的学习方法，专为儿童定制的学习方法。有专业老师以有趣、做游戏、场景…'
      },
      {
        imgSrc:"static/class4.png",
        title:"幼儿课程",
        banner:'https://images.pexels.com/photos/1296146/pexels-photo-1296146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 1x, https://images.pexels.com/photos/1296146/pexels-photo-1296146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 2x',
        stars:4,
        averge:"869",
        price:'1888',
        address:"西湖区 西溪银泰城",
        hot:"18627",
        distance:"806m",
        id:2,
        organId:1,
        introduce:'传统课程，刚开始接触就会教弹奏技巧，从中音do开始学习。“夏日奇缘”定制钢琴课，使用雅马哈母语的学习方法，专为儿童定制的学习方法。有专业老师以有趣、做游戏、场景…'
    },
      {
          imgSrc:"static/class2.png",
          title:"儿童高级课程",
          banner:'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 1x, https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 2x',
          stars:5,
          averge:"362",
          price:'688',
          address:"西湖区 西溪银泰城",
          hot:"18627",
          distance:"806m",
          id:3,
          organId:2,
          introduce:'传统课程，刚开始接触就会教弹奏技巧，从中音do开始学习。“夏日奇缘”定制钢琴课，使用雅马哈母语的学习方法，专为儿童定制的学习方法。有专业老师以有趣、做游戏、场景…'
      },
      {
        imgSrc:"static/class3.png",
        title:"少儿英语",
        banner:'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 1x, https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 2x',
        stars:4.5,
        averge:"962",
        price:'888',
        address:"西湖区 西溪银泰城",
        hot:"18627",
        distance:"806m",
        id:4,
        organId:2,
        introduce:'传统课程，刚开始接触就会教弹奏技巧，从中音do开始学习。“夏日奇缘”定制钢琴课，使用雅马哈母语的学习方法，专为儿童定制的学习方法。有专业老师以有趣、做游戏、场景…'
    },
    {
      imgSrc:"static/class4.png",
      title:"目标导向课程",
      banner:'https://images.pexels.com/photos/1011329/pexels-photo-1011329.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 1x, https://images.pexels.com/photos/1011329/pexels-photo-1011329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 2x',
      stars:5,
      averge:"800",
      price:'788',
      address:"西湖区 西溪银泰城",
      hot:"18627",
      distance:"806m",
      id:5,
      organId:1,
      introduce:'传统课程，刚开始接触就会教弹奏技巧，从中音do开始学习。“夏日奇缘”定制钢琴课，使用雅马哈母语的学习方法，专为儿童定制的学习方法。有专业老师以有趣、做游戏、场景…'
  }
  ],
  // 老师信息
  teacherInfo:[
    {
      imgSrc:'https://images.pexels.com/photos/325924/pexels-photo-325924.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 1x, https://images.pexels.com/photos/325924/pexels-photo-325924.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500 2x',
      name:'茱莉亚',
      info:'英语老师 | 教龄4年',
      back:'教育背景：哥伦比亚大学',
      introduce:'个人简介：第十届青年教师业务素质考核一等奖;1121工程第一批骨干教师。',
      jianjie:'国际英语大赛特等奖，全国大学教师资格证，普通话证书，托福雅思证书，大学期间在哥伦比亚大学进修。连续3年被评为“最受学生欢迎老师”和“最受家长青睐老师”的荣誉称号。只要她在，不仅能够提高孩子们的钢琴水平，还能够让家长放心的把孩子交给她照顾。',
      stars:5,
      id:1
    },
    {
      imgSrc:'https://images.pexels.com/photos/1350615/pexels-photo-1350615.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 1x, https://images.pexels.com/photos/1350615/pexels-photo-1350615.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500 2x',
      name:'薇薇安',
      info:'化学老师 | 教龄5年',
      back:'教育背景：英国约克大学',
      introduce:'个人简介：香港国际化学大赛一等奖，全国高中优秀教师，普通话证书。',
      jianjie:'国际化学大赛一等奖，全国大学教师资格证，普通话证书，托福雅思证书，大学期间在英国约克大学进修。连续3年被评为“最受学生欢迎老师”和“最受家长青睐老师”的荣誉称号。只要她在，不仅能够提高孩子们的钢琴水平，还能够让家长放心的把孩子交给她照顾。',
      stars:5,
      id:2
    },
    {
      imgSrc:'https://images.pexels.com/photos/935943/pexels-photo-935943.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      name:'戴安娜',
      info:'英语老师 | 教龄5年',
      back:'教育背景：英国剑桥大学',
      introduce:'个人简介：普通话证书;2018英国十大最牛教师;伦敦优秀教育工作者',
      jianjie:'国际英语大赛一等奖，全国大学教师资格证，普通话证书，托福雅思证书，大学期间在英国剑桥大学进修。连续3年被评为“最受学生欢迎老师”和“最受家长青睐老师”的荣誉称号。只要她在，不仅能够提高孩子们的钢琴水平，还能够让家长放心的把孩子交给她照顾。',
      stars:5,
      id:3
    }
  ],
  // 学习脚信息
    studyInfo:[
      {
        imgSrc:'static/head.png',
        name:'篱笆外的小思绪',
        time:'1小时前',
        title:'我孩子的学习计划',
        content:'我的小孩一年级了，想到了未来六年的学业，就赶紧提前准备了，分别有书本知识，还有课外知识，才艺等，我会在后面po上我制定的学习计划。',
        pick1:'回帖180',
        pick2:'阅读210',
        pick3:'分享68',
        id:1
      },
      {
        imgSrc:'static/head2.png',
        name:'草莓冰的浅浅',
        time:'3小时前',
        title:'杭州西湖有个课程转让',
        content:'因为购买的时候还在杭州，现在因为移民，转让名额，有没有要的呀？是小孩子的钢琴课程，可以优惠转让。',
        pick1:'回帖80',
        pick2:'阅读230',
        pick3:'分享28',
        id:2
      },
      {
        imgSrc:'static/head3.png',
        name:'西红柿炒番茄',
        time:'4小时前',
        title:'孩子获得了奥数一等奖',
        content:'我的小孩四年级的时候，想到了未来的学业，就准备了奥数班，后来在奥数比赛中获得了一等奖。',
        pick1:'回帖180',
        pick2:'阅读210',
        pick3:'分享68',
        id:3
      },
      {
        imgSrc:'static/head4.png',
        name:'土豆洋芋马铃薯',
        time:'7小时前',
        title:'孩子英语成绩100份',
        content:'我的小孩从小就进行英语培训，在几年的努力下最近的一次期末考试获得了100分，孩子学习还是得从小就开始抓起。',
        pick1:'回帖480',
        pick2:'阅读810',
        pick3:'分享128',
        id:4
      },
    ],
    studyInfo2:[
      {
        imgSrc:'static/head2.png',
        name:'草莓冰的浅浅',
        time:'半小时前',
        title:'杭州西湖有个课程转让',
        content:'因为购买的时候还在杭州，现在因为移民，转让名额，有没有要的呀？是小孩子的钢琴课程，可以优惠转让。',
        pick1:'回帖80',
        pick2:'阅读230',
        pick3:'分享28',
        id:2
      },
      {
        imgSrc:'static/head4.png',
        name:'土豆洋芋马铃薯',
        time:'2小时前',
        title:'孩子英语成绩100份',
        content:'我的小孩从小就进行英语培训，在几年的努力下最近的一次期末考试获得了100分，孩子学习还是得从小就开始抓起。',
        pick1:'回帖480',
        pick2:'阅读810',
        pick3:'分享128',
        id:4
      },
      {
        imgSrc:'static/head.png',
        name:'篱笆外的小思绪',
        time:'3小时前',
        title:'我孩子的学习计划',
        content:'我的小孩一年级了，想到了未来六年的学业，就赶紧提前准备了，分别有书本知识，还有课外知识，才艺等，我会在后面po上我制定的学习计划。',
        pick1:'回帖180',
        pick2:'阅读210',
        pick3:'分享68',
        id:1
      },
      {
        imgSrc:'static/head3.png',
        name:'西红柿炒番茄',
        time:'3小时前',
        title:'孩子获得了奥数一等奖',
        content:'我的小孩四年级的时候，想到了未来的学业，就准备了奥数班，后来在奥数比赛中获得了一等奖。',
        pick1:'回帖180',
        pick2:'阅读210',
        pick3:'分享68',
        id:3
      },
      {
        imgSrc:'static/head5.png',
        name:'香果冰淇淋',
        time:'5小时前',
        title:'杭州拱墅有个课程转让',
        content:'因为购买的时候还在杭州，现在因为移民，转让名额，有没有要的呀？是小孩子的钢琴课程，可以优惠转让。',
        pick1:'回帖85',
        pick2:'阅读220',
        pick3:'分享21',
        id:5
      },
      
    ]    

    }
  },
  computed: {},
  methods: {

}
}
