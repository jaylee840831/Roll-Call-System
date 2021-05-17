//印出選擇的點名紀錄
function print_value() {

    var classname = document.getElementById("class_List").value;


       var user=firebase.auth().currentUser;
       var personData=firebase.database().ref().child("rollcall/"+classname);

       personData.on("value",function(data){

         if(data.exists())
         {
            var idArray=['出席: ','日期: ','缺席: ','課程名稱: ','點名者: '];
           var array = new Array();

           data.forEach(function(resultdata){
             array.push(resultdata.val());
           });
           
          //var idList = array.map(item => Object.values(item)[8]);

           var string="";

             for(i=0;i<array.length;i++){
                if(idArray[i]=='出席: ' || idArray[i]=='缺席: ')
                {
                 if(idArray[i]=='出席: ')
                    string+="<div style='color:green;margin-bottom: 20px;'>"+idArray[i]+""+array[i]+"</div>";
                 else
                     string+="<div style='color:red;margin-bottom: 20px;'>"+idArray[i]+""+array[i]+"</div>";
                }
                else
                {
                 string+="<div style='margin-bottom: 20px;'>"+idArray[i]+""+array[i]+"</div>";
                }
               }
            
            document.getElementById("select_class_List").innerHTML =string;

         }
       });

}


window.onload = function () {

    // 列出所有已點名之課程名稱
    var user=firebase.auth().currentUser;
    var personData=firebase.database().ref().child("rollcall/");

    personData.on("value",function(data){

      if(data.exists())
      {
        var array = new Array();

        data.forEach(function(resultdata){
          array.push(resultdata.val());
        });
        
        var idList = array.map(item => Object.values(item)[1]);
        var idList2=array.map(item => Object.values(item)[3]);
        var firsPrintData=idList[0]+","+idList2[0];

        var string="";

          for(i=0;i<idList.length;i++){
            string+="<option value='"+idList[i]+","+idList2[i]+"'>"+idList[i]+" "+idList2[i]+"</option>";
            }
         
         document.getElementById("class_List").innerHTML =string;




                    // 印出第一筆點名資料
                    var personData2=firebase.database().ref().child("rollcall/"+firsPrintData);

                    personData2.on("value",function(data){
             
                      if(data.exists())
                      {
                        var idArray=['出席: ','日期: ','缺席: ','課程名稱: ','點名者: '];
                        var array = new Array();
             
                        data.forEach(function(resultdata){
                          array.push(resultdata.val());
                        });
             
                        var string="";
             
                          for(i=0;i<array.length;i++){
                            if(idArray[i]=='出席: ' || idArray[i]=='缺席: ')
                            {
                                if(idArray[i]=='出席: ')
                                string+="<div style='color:green;margin-bottom: 20px;'>"+idArray[i]+""+array[i]+"</div>";
                                else
                                string+="<div style='color:red;margin-bottom: 20px;'>"+idArray[i]+""+array[i]+"</div>";
                            }
                            else
                            {
                            string+="<div style='margin-bottom: 20px;'>"+idArray[i]+""+array[i]+"</div>";
                            }
                            }
                         
                         document.getElementById("select_class_List").innerHTML =string;
             
                      }
                    });

        }

    });
}