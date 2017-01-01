var frst = moment("20170102", "YYYYMMDD");
var brk = moment("20170220", "YYYYMMDD");

var make_schedule = function(offset){
    var date = frst.clone();
    $('.week:not(.hrow)').each(function(k){
        // add date (if missing)
        if($(this).find(".date").length){
            var dd = date.clone().add('d',offset);
            // console.log("lecture " + k + " " + k%2 + " " + dd.format('D MMM'));
            var e = $(this).find(".date");
            e.html(dd.format('MMM D'));
            date.add('d', 7);
            if (date.isSame(brk)) date.add('d', 7);
        }
    });
}

