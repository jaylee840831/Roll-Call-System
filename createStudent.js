(function(){

    var mainContainer = document.getElementById("main_container");
    
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
                Num=array[1];
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
    
    })();




    window.onload = function () {

        // 列出所有課程
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

            var string="";

              for(i=0;i<idList.length;i++){
                string+="<div><input type='checkbox' name='checkbox2' id='checkbox2' value='"+idList[i]+"'/>"+idList[i]+"</div>";
                }

                string+="<div><input type='checkbox' name='checkAll2' id='checkAll2' value='以上全部'/>以上全部</div>";
             
             document.getElementById("J_List").innerHTML =string;


                        //獲取複選框元素 (刪除課程之複選框)
                        var checkbox2 = document.all('checkbox2'); //document.all[name]獲得
                        var checkall2 = document.getElementById('checkAll2');
                
                        /*點選全選按鈕全部選中的情況*/
                        checkall2.addEventListener('click',function(){
                            
                           if (checkbox2.length == undefined) {//一個選項時，長度是undefined；
                               checkbox2.checked = checkall2.checked;
                           }else{
                                for (var i = 0; i < checkbox2.length; i++) {//多個選項時
                                    checkbox2[i].checked = this.checked;//this指代checkall,checkall選中，將true賦給checkbox[i].checked
                                }
                               
                           }
                        },false);
                
                
                        //全部按鈕什麼時候被自動選中以及自動取消
                        if (checkbox2.length == undefined) {//一個選項時
                               checkbox2.addEventListener('click',function(){
                                   checkall2.checked = checkbox2.checked;
                               },false);
                           }else{
                                for (var i = 0; i < checkbox2.length; i++) {//多個選項時    
                                    checkbox2[i].addEventListener('click',function(){
                                       for (var i = 0; i < checkbox2.length; i++){
                                           if (!checkbox2[i].checked) {
                                               checkall2.checked = false; //全選自動取消
                                               break;
                                           }else{
                                               if (i == checkbox2.length -1) { checkall2.checked = true;}; //全選自動勾選
                                           }
                                       }
                                   },false);
                                }
                       }

          }
        });


        //列出所有學員
        var personData2=firebase.database().ref().child("students/");

        personData2.on("value",function(data){

          if(data.exists())
          {
            var array = new Array();

            data.forEach(function(resultdata){
              array.push(resultdata.val());
            });
            
            var idList = array.map(item => Object.values(item)[0]);
            var idList2 = array.map(item => Object.values(item)[1]);

            var string="";

              for(i=0;i<idList.length;i++){
                string+="<div><input type='checkbox' name='checkbox' id='checkbox' value='學員:"+idList[i]+"家長:"+idList2[i]+"'/>學員: "+idList[i]+" 家長: "+idList2[i]+"</div>";
                }

                string+="<div><input type='checkbox' name='checkAll' id='checkAll' value='以上全部'/>以上全部</div>";
             
             document.getElementById("student_List").innerHTML =string;


                        //獲取複選框元素 (刪除課程之複選框)
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


      //上傳學員資料
     document.getElementById('confirm').addEventListener('click',function() {

        var checkbox2 = document.all('checkbox2'); //document.all[name]獲得
        var checkall2 = document.getElementById('checkAll2');

              //一個個去選擇時的情況
              var yourchoose2 ="";
              if (checkbox2.length == undefined) {//一個選項時
                  if (checkbox2.checked) yourchoose2 = yourchoose2 + checkbox2.value;
              }else{
                  for (var i = 0; i < checkbox2.length; i++) {//多個選項時
                      if (checkbox2[i].checked) yourchoose2 = yourchoose2 + checkbox2[i].value + ",";
                  };
              }

             
              var studentname = document.getElementById('studentname');
              var height = document.getElementById('height');
              var weight = document.getElementById('weight');
              var birth = document.getElementById('birth');
              var school = document.getElementById('school');
              var adultname = document.getElementById('adultname');
              var adultphone = document.getElementById('adultphone');

if(studentname.value!=""&&adultname.value!="")
{
              //var userid=firebase.auth().currentUser.uid;
             var roofref=firebase.database().ref().child("students");
             var userref=roofref.child("學員:"+studentname.value+","+"家長:"+adultname.value);

if(studentname.value!=""&& adultname.value!=""&& yourchoose2!="" &&adultphone.value!="")
{

  var userdata=
  {
    "學員姓名":studentname.value,
    "身高":height.value,
    "體重":weight.value,
    "生日":birth.value,
    "就讀學校":school.value,
    "家長姓名":adultname.value,
    "家長電話":adultphone.value,
    "選擇的課程":yourchoose2
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
  window.alert("資料輸入不完整 (請至少輸入 學員姓名、家長姓名、家長電話、想報名的課程)");
}
}
else{
  window.alert("資料輸入不完整 (請至少輸入 學員姓名、家長姓名、家長電話、想報名的課程)");
}

          },false); 





          //刪除學員資料
     document.getElementById('cencle-confirm').addEventListener('click',function() {

        var checkbox = document.all('checkbox'); //document.all[name]獲得

        //一個個去選擇時的情況
        var yourchoose ="";
        if (checkbox.length == undefined) {//一個選項時
            if (checkbox.checked)
             yourchoose = yourchoose + checkbox.value;
        }else{
            for (var i = 0; i < checkbox.length; i++) {//多個選項時
                if (checkbox[i].checked)
                 yourchoose = yourchoose + checkbox[i].value + ",";
            };
        }

       
        if(yourchoose!="")
        {
       //var user=firebase.auth().currentUser;
  
       if (checkbox.length == undefined) {//一個選項時
           if (checkbox.checked)
             {
           var personData=firebase.database().ref().child("students/"+checkbox.value).remove();
             }

             window.location.href="createStudent.html";
       }else{

        var array = new Array();
          
           for ( i =checkbox.length-1; i>=0; i--) {//多個選項時
               if (checkbox[i].checked)
               {
                array.push(checkbox[i]);
               }
           };

           for( i=array.length-1;i>=0;i--)
           {
            var personData=firebase.database().ref().child("students/"+array[i].value).remove();
           }

           window.location.href="createStudent.html";
       }
  
        }
        else{
          window.alert("資料輸入不完整");
        }

  },false); 

  }