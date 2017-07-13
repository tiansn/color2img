
function color2img(){
  var colorVals = $('#colorVals').val();
  if(!colorVals){
    alert('请输入color值')
    return false;
  }

  var colorArr = colorVals.toString().trim().split('#');
  var arr1 = [];
  var params = {}
  for(var i=0;i<colorArr.length;i++){
    var cVal = colorArr[i];
    if(cVal){
      cVal = cVal.trim();
      arr1.push(cVal)
    }
  }

  console.log({'params': arr1});
  $.ajax({
    url: '/generateImg',
    type: 'POST',
    dataType: 'json',
    data: {'params': arr1}
  })
  .done(function(cb) {
    console.log("success");
    if(cb.finish){
      $('#showUrl').show();
    }
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

$(function(){
  $('#generate-btn').click(color2img);
})
