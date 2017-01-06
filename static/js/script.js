var make_schedule = function(frst, increment, offset){
    var date = moment(frst, "YYYYMMDD");
    $('.week:not(.hrow)').each(function(k){
        // add date (if missing)
        if($(this).find(".date").length){
            var dd = date.clone().add('d', offset);
            // console.log("lecture " + k + " " + k%2 + " " + dd.format('D MMM'));
            var e = $(this).find(".date");
            e.html(dd.format('MMM D'));
            date.add('d', increment);
        }
    });
}

