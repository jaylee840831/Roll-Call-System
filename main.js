var mainApp = {};
var uid=null;
var email=null;

var Name=null;


window.onload = function () {


  var user=firebase.auth().currentUser;
  var personData=firebase.database().ref().child("users/"+uid);
  
  personData.on("value",function(data){

    if(data.exists())
    {
      var array = new Array();

      data.forEach(function(resultdata){
        array.push(resultdata.val());
      });
      
      var username=document.getElementById("user-name");
      username.textContent=array[0];

      Name=array[0].value;
    }
  });

       // 列出所有課程名稱
       var user=firebase.auth().currentUser;
       var personData=firebase.database().ref().child("classes/");

       personData.on("value",function(data){

         if(data.exists())
         {
           var array = new Array();

           data.forEach(function(resultdata){
             array.push(resultdata.val());
           });
           
           var idList = array.map(item => Object.values(item)[8]);
           var firsPrintData=idList[0];

           var string="";

             for(i=0;i<idList.length;i++){
               string+="<option value='"+idList[i]+"'>"+idList[i]+"</option>";
               }
            
            document.getElementById("class_List").innerHTML =string;



            // 印出第一筆課程資料
            var personData2=firebase.database().ref().child("classes/"+firsPrintData);

       personData2.on("value",function(data){

         if(data.exists())
         {
           var idArray=['上課地點: ','上課日期:禮拜 ','上課時間: ','人數限制: ','備註: ','助教姓名: ','教練姓名: ','課程內容簡述: '];
           var array = new Array();

           data.forEach(function(resultdata){
             array.push(resultdata.val());
           });

           var string="";

             for(i=array.length-2;i>=0;i--){
               string+="<div>"+idArray[i]+""+array[i]+"</div>";
               }
            
            document.getElementById("select_class_List").innerHTML =string;

         }
       });


        //比對學員有上的課程  列出該堂課所有學員名單
        var personData2=firebase.database().ref().child("students/");

        personData2.on("value",function(data){

          if(data.exists())
          {
            var array = new Array();

            data.forEach(function(resultdata){
              array.push(resultdata.val());
            });
            
            var list_student=array.map(item => Object.values(item)[0]);
            var list_adult=array.map(item => Object.values(item)[1]);
            var idList = array.map(item => Object.values(item)[6]);


            var array_include=new Array();
            var array_include2=new Array();

            for(i=0;i<idList.length;i++)
            {
             
              if(idList[i].indexOf(firsPrintData)>= 0)
              {
                array_include.push("學員:"+list_student[i]+"家長:"+list_adult[i]);
                array_include2.push("學員: "+list_student[i]+" 家長: "+list_adult[i]);
              }
            }

            var string2="";

              for(i=0;i<array_include.length;i++){
               
                string2+="<div><input type='checkbox' name='checkbox' id='checkbox' value='"+array_include[i]+"'/>"+array_include2[i]+"</div>";
                
                }

                string2+="<div><input type='checkbox' name='checkAll' id='checkAll' value='以上全部'/>以上全部</div>";
             
             document.getElementById("select_student_List").innerHTML =string2;



             var checkbox = document.all('checkbox'); //document.all[name]獲得
             var checkall = document.getElementById('checkAll');
                
                        /*點選全選按鈕全部選中的情況*/
                        checkall.addEventListener('click',function(){
                            
                           if (checkbox.length == undefined) {//一個選項時，長度是undefined；
                               checkbox.checked = checkall.checked;
                           }else{
                                for (var i = 0; i < checkbox.length; i++) {//多個選項時
                                    checkbox[i].checked = this.checked;//this指代checkall,checkall選中，將true賦給checkbox[i].checked
                                }
                               
                           }
                        },false);
                
                
                        //全部按鈕什麼時候被自動選中以及自動取消
                        if (checkbox.length == undefined) {//一個選項時
                               checkbox.addEventListener('click',function(){
                                   checkall.checked = checkbox.checked;
                               },false);
                           }else{
                                for (var i = 0; i < checkbox.length; i++) {//多個選項時    
                                    checkbox[i].addEventListener('click',function(){
                                       for (var i = 0; i < checkbox.length; i++){
                                           if (!checkbox[i].checked) {
                                               checkall.checked = false; //全選自動取消
                                               break;
                                           }else{
                                               if (i == checkbox.length -1) { checkall.checked = true;}; //全選自動勾選
                                           }
                                       }
                                   },false);
                                }
                       }

         
            }
          });    


         }
       });

}

//印出選擇的課程的所有資料
function print_value() {
           
  var classname = document.getElementById("class_List").value;


       var user=firebase.auth().currentUser;
       var personData=firebase.database().ref().child("classes/"+classname);

       personData.on("value",function(data){

         if(data.exists())
         {
           var idArray=['上課地點: ','上課日期:禮拜 ','上課時間: ','人數限制: ','備註: ','助教姓名: ','教練姓名: ','課程內容簡述: '];
           var array = new Array();

           data.forEach(function(resultdata){
             array.push(resultdata.val());
           });
           
          //var idList = array.map(item => Object.values(item)[8]);

           var string="";

             for(i=array.length-2;i>=0;i--){
               string+="<div>"+idArray[i]+""+array[i]+"</div>";
               }
            
            document.getElementById("select_class_List").innerHTML =string;

         }
       });



        //比對學員有上的課程  列出該堂課所有學員名單
        var personData2=firebase.database().ref().child("students/");

        personData2.on("value",function(data){

          if(data.exists())
          {
            var array = new Array();

            data.forEach(function(resultdata){
              array.push(resultdata.val());
            });
            
            var list_student=array.map(item => Object.values(item)[0]);
            var list_adult=array.map(item => Object.values(item)[1]);
            var idList = array.map(item => Object.values(item)[6]);


            var array_include=new Array();
            var array_include2=new Array();

            for(i=0;i<idList.length;i++)
            {
             
              if(idList[i].indexOf(classname)>= 0)
              {
                array_include.push("學員:"+list_student[i]+"家長:"+list_adult[i]);
                array_include2.push("學員: "+list_student[i]+" 家長: "+list_adult[i]);
              }
            }

            var string2="";

              for(i=0;i<array_include.length;i++){
               
                string2+="<div><input type='checkbox' name='checkbox' id='checkbox' value='"+array_include[i]+"'/>"+array_include2[i]+"</div>";
                
                }
             
                string2+="<div><input type='checkbox' name='checkAll' id='checkAll' value='以上全部'/>以上全部</div>";

             document.getElementById("select_student_List").innerHTML =string2;


             var checkbox = document.all('checkbox'); //document.all[name]獲得
             var checkall = document.getElementById('checkAll');
                
                        /*點選全選按鈕全部選中的情況*/
                        checkall.addEventListener('click',function(){
                            
                           if (checkbox.length == undefined) {//一個選項時，長度是undefined；
                               checkbox.checked = checkall.checked;
                           }else{
                                for (var i = 0; i < checkbox.length; i++) {//多個選項時
                                    checkbox[i].checked = this.checked;//this指代checkall,checkall選中，將true賦給checkbox[i].checked
                                }
                               
                           }
                        },false);
                
                
                        //全部按鈕什麼時候被自動選中以及自動取消
                        if (checkbox.length == undefined) {//一個選項時
                               checkbox.addEventListener('click',function(){
                                   checkall.checked = checkbox.checked;
                               },false);
                           }else{
                                for (var i = 0; i < checkbox.length; i++) {//多個選項時    
                                    checkbox[i].addEventListener('click',function(){
                                       for (var i = 0; i < checkbox.length; i++){
                                           if (!checkbox[i].checked) {
                                               checkall.checked = false; //全選自動取消
                                               break;
                                           }else{
                                               if (i == checkbox.length -1) { checkall.checked = true;}; //全選自動勾選
                                           }
                                       }
                                   },false);
                                }
                       }

         
            }
          });    

}


//送出點名清單
function rollcall_confirm()
{
  var checkbox = document.all('checkbox'); //document.all[name]獲得
        //var checkall = document.getElementById('checkAll');

              //一個個去選擇時的情況
              var yourchoose ="";
              var notchoose="";
              if (checkbox.length == undefined) {//一個選項時
                  if (checkbox.checked)
                  {
                   yourchoose = yourchoose + checkbox.value;
                  }
                  else
                  {
                    notchoose= notchoose+checkbox.value;
                  }
              }else{
                  for (var i = 0; i < checkbox.length; i++) {//多個選項時
                      if (checkbox[i].checked)
                      { 
                        yourchoose = yourchoose + checkbox[i].value + ",";
                      }
                      else
                      {
                        notchoose=notchoose+checkbox[i].value+",";
                      }
                  };
              }


               //取得目前時間
                            
                              //這裡程式碼多了幾行，但是不會延遲顯示，速度比較好，格式可以自定義，是理想的時間顯示
                              setInterval("fun(show_time)",1); 
                              var date = new Date();  //建立物件  
                              var y = date.getFullYear();     //獲取年份  
                              var m =date.getMonth()+1;   //獲取月份  返回0-11  
                              var d = date.getDate(); // 獲取日  
                              var w = date.getDay();   //獲取星期幾  返回0-6   (0=星期天) 
                              var ww = ' 星期'+'日一二三四五六'.charAt(new Date().getDay()) ;//星期幾
                              var h = date.getHours();  //時
                              var minute = date.getMinutes()  //分
                              var s = date.getSeconds(); //秒
                              var sss = date.getMilliseconds() ; //毫秒
                              if(m<10){
                              m = "0"+m;
                              }
                              if(d<10){
                              d = "0"+d;
                              }
                              if(h<10){
                              h = "0"+h;
                              }
                              
                              
                              if(minute<10){
                              minute = "0"+minute;
                              }
                              
                              
                              if(s<10){
                              s = "0"+s;
                              }
                              
                              
                              if(sss<10){
                              sss = "00"+sss;
                              }else if(sss<100){
                              sss = "0"+sss;
                              }
                              
                              // 目前時間
                              var currenttime =  y+"-"+m+"-"+d+"-"+ww;
                              //目前點名的課程名稱
                              var classname = document.getElementById("class_List").value;
                              var username=document.getElementById("user-name").textContent;


              //var userid=firebase.auth().currentUser.uid;
              var roofref=firebase.database().ref().child("rollcall");
              var userref=roofref.child(currenttime+","+classname);
            
            
                var userdata=
                {
                  "日期:":currenttime,
                  "課程名稱":classname,
                  "點名者":username,
                  "出席":yourchoose,
                  "未出席":notchoose
                };
            
                userref.set(userdata,function(error)
                {
                  if(error)
                  {
                    var errorcode=error.code;
                    var errormessage=error.message;
            
                    console.log(errorcode);
                    console.log(errormessage);
                    window.alert("上傳錯誤 "+errormessage);
                  }
                  else
                  {
                    window.alert("點名成功，可以到資料查詢去確認");
                  }
                });
            
}


//上傳使用者資料
function processFormData() 
{

  var nameElement = document.getElementById("name"); //姓名
  var emailElement = document.getElementById("email"); //編號
  var username=document.getElementById("user-name");

  if(nameElement.value!="")
  {
  username.textContent=nameElement.value;
  }
  
  // 得到選擇的圖片和名稱
  var image=document.getElementById("file").files[0];

  // upload 照片
  if(image!=null)
  {
  var storageref=firebase.storage().ref(uid+'/'+'image'+'/'+"personImage.jpg");
  var uploadtask=storageref.put(image);
  uploadtask.on('state_changed',function(snapshot)
  {
    var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;

  },
  function(error){
    console.log(error.message);
  }
  ,
  function()
  {

  uploadtask.snapshot.ref.getDownloadURL().then(function(downloadURL){
    
  document.getElementById("image").src=downloadURL;
  document.getElementById("image").style.width=200+"px";
  document.getElementById("image").style.height=150+"px";

  document.getElementById("titleimage").src=downloadURL;
  document.getElementById("titleimage").style.width=15+"%";
  document.getElementById("titleimage").style.height=15+"%";
  });

  });

}


var userid=firebase.auth().currentUser.uid;
  var roofref=firebase.database().ref().child("users");
  var userref=roofref.child(userid);

  if(nameElement.value!="" && emailElement.value!="")
  {
    var userdata=
    {
      "name":nameElement.value,
      "userID":emailElement.value
    };

    userref.set(userdata,function(error)
    {
      if(error)
      {
        var errorcode=error.code;
        var errormessage=error.message;

        console.log(errorcode);
        console.log(errormessage);
        window.alert("上傳錯誤 "+errormessage);
      }
      else
      {
        window.alert("修改成功");
      }
    });



     

  }
  else
  {
    window.alert("資料輸入不完整");
  }

}


function createClass()
{
  window.location.href="createClass.html";
}

function createStudent()
{
  window.location.href="createStudent.html";
}
function searchData()
{
  window.location.href="searchData.html";
}

(function(){
var mainContainer = document.getElementById("main_container");

// 設定員工基本資料
document.getElementById("setProfile").addEventListener("click",function(){
   document.querySelector('.bg-modal').style.display="flex";

});

//登出
    var logtout =  function(){
        app_fireBase.auth().signOut().then(function(){
            console.log('success');
            window.location.replace("login.html");
        },function(){})
    }


    document.getElementById("close").addEventListener("click",function(){
      document.querySelector('.bg-modal').style.display="none";
    }); 

// 檢查使用者是否 signed in
var init = function(){
    app_fireBase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          uid=user.uid;
          email=user.email;
  
          console.log("stay");
          mainContainer.style.display = "";

          var pathReference = firebase.storage().ref(uid+'/'+'image'+'/'+"personImage.jpg");
          pathReference.getDownloadURL().then(function(url) {

            document.getElementById("image").src=url;
            document.getElementById("image").style.width=200+"px";
            document.getElementById("image").style.height=150+"px";

            document.getElementById("titleimage").src=url;
            document.getElementById("titleimage").style.width=15+"%";
            document.getElementById("titleimage").style.height=15+"%";
        });


        var user=firebase.auth().currentUser;
        var personData=firebase.database().ref().child("users/"+uid);
        
        personData.on("value",function(data){

          if(data.exists())
          {
            var array = new Array();

            data.forEach(function(resultdata){
              array.push(resultdata.val());
            });
            
            var username=document.getElementById("user-name");
            username.textContent=array[0];

            Name=array[0];
          }
        });

        } else {
          // No user is signed in.
          mainContainer.style.display = "none";
          console.log("redirect");
          window.location.replace("login.html");
        }
      });
}
    
init();


mainApp.logout = logtout;
})();
