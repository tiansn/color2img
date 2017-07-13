
function color2url(){
  var colorVals = $('#colorVals').val();
  if(!colorVals){
    alert('请输入color值')
  }
  //https://dummyimage.com/300x300/FF007F/FF007F.jpg
  var colorArr = colorVals.toString().trim().split('#');
  for(var i=0;i<colorArr.length;i++){
    var cVal = colorArr[i];
    if(cVal){
      cVal = cVal.trim();
      var dom1 = $("<tr><td></td></tr>");
      var url = "https://dummyimage.com/300x300/" +cVal+ "/" +cVal+ ".jpg";
      $(dom1).find('td').text(url);
      $('#showUrl').find('tbody').append(dom1);
    }
  }
  $('#showUrl').show();
}

$(function(){
  $('#generate-btn').click(color2url);
})
