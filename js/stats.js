function loadChart(chart,callback){
  switch(chart){
    case "barchart":
      extractBarChartData("#barchart","type_name",entities);
    break;
  }
  callback.call();
}





