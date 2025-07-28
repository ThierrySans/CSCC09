function get_deadlines(frst, offset){
    let date = moment(frst, "YYYYMMDD");
    $('.week:not(.hrow)').each(function(k){
        // add date (if missing)
        if($(this).find(".date").length){
			const dd = date.clone().add('d', offset);
            const e = $(this).find(".date");
            e.html(dd.format('MMM D'));
            date.add('d', 7);
        }
    });
}


function make_schedule(frst){
    let date = moment(frst, "YYYYMMDD");
    $('.week:not(.hrow)').each(function(k){
        // add date (if missing)
        if($(this).find(".date").length){
			const dd = date.clone().add('d', 5);
            const e = $(this).find(".date");
            e.html(date.format('MMM D') + ' - ' + dd.format('MMM D'));
            date.add('d', 7);
        }
    });
}
