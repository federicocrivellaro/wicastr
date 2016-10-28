var baseRoot = "https://gather.siineserver.com/GatherServerLive/";
var assetsRoot = "https://staging.siineserver.com/GatherServer/clients/elavispero/mapaz/webapp/";

/* languages*/
var appLang = 'es';
var translator;

var entity_id;
var entities;
var entity;


var uuid;
var domain;
var categories;

var lang;
var isPrimary = true;
var langIndex = 0;
var firstImage;
var hasCategories = false;
var userGPS = [];
// START AT URLSHORTENER
var numberOfGraphs;

$(document).ready(function() {

	uuid=checkCookie("GatherWidgetID");

    appLang = 'es';

   function download(text, name, type) {
        var a = document.createElement("a");
        var file = new Blob([text], {type: type});
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }


    function saveText(text, filename){
      var a = document.createElement('a');
      a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
      a.setAttribute('download', filename);
      a.click();
    }

    var obj = {a: "Hello", b:"World"};
    saveText( JSON.stringify(obj), "filename.json" );
    download(obj, 'test.txt', 'text/plain');

});

    /*
    var newEntity = new Object();
    newEntity.client_id = client_id;
    newEntity.entity = {};
    var jsonString = JSON.stringify(newEntity);


    doRequestNoHeader(baseRoot + "GetDomains", "{\"client_id\":\"" + client_id + "\",\"domain_id\":\"" + domain_id + "\",\"activeOnly\":" + false + "}", function() {
        if (this.domains.length == 0) {
            $('#somethingwrong').fadeIn('slow');
            return false;
        }
        domain = this.domains[0];

        doRequestNoHeader(baseRoot + "GetCategories", "{\"client_id\":\"" + client_id + "\",\"domain_id\":\"" + domain_id + "\"}", function() {
            categories = this.categories;
            hasCategories = false;
            if (categories.length > 1) {
                hasCategories = true;
            } else {
                var typeCounter = 0;
                for (var t = 0; t < categories[0].types.length; t++) {
                    typeCounter = typeCounter + 1
                    if (typeCounter > 1) {
                        hasCategories = true;
                        return;
                    }
                }
            }
            if (hasCategories === false) {
                $('#barchartContainer').remove();
            }
            numberOfGraphs = $("#statsPages").children().length;
            if (numberOfGraphs < 2) {
                $('.navStats').remove();
                $('#statsPages').removeClass('navBar');
            }
           drawForm();
        });

        // GET IF THE THE CHOSEN LANGUAGE IS THE PRIMARY. 
        // IF NOT STORE THE LANG INDEX INTO THE DOMAIN FOR FUTURE USAGE
        if (isAvailableData(domain.i18n)) {
            if (appLang != domain.i18n.primary) {
                isPrimary = false;
                for (var langs = 0; langs < domain.i18n.others.length; langs++) {
                    if (appLang == domain.i18n.others[langs].code) {
                        langIndex = langs;
                    }
                }
            }
        }
        var weekago=moment().subtract(1,'w').valueOf();
        callEntities(weekago,function(){
            //ExtractMapData(this);
            $('.covermenu-scale').fadeOut('slow');
        });
        $('.backgroundImg').css('background-image', 'url(' + checkHttps(domain.backgroundUrl) + ')');
    });
});


function callEntities(from,callback){
    var now = null;
    doRequestNoHeader(baseRoot + "GetEntity", "{\"client_id\":\"" + client_id + "\",\"domain_id\":\"" + domain_id + "\",\"fromTime\":"+from+",\"now\":" + now + ",\"returnSpam\":" + false + ",\"returnFields\":" + true + "}", function() {
        entities = this.entities;
        callback.call(entities);
    });
}





// BASIC INFO
function loadBasicInfo() {
    $('#insert_time').text(moment(entity.insert_time).format('LLL'));
    if (isAvailableData(entity.map_text)) {
        $('#map_text').html(entity.map_text);
    }
    if (isAvailableData(entity.comments)) {
        for (var i = 0; i < entity.comments.length; i++) {
            createComment(entity.comments[i].text);
        }
    }
}

function createComment(data) {
    comment = "<p>" + data + "</p>"
    var commentBox = $('<blockquote>', { html: comment });
    commentBox.appendTo($('#comments'));
}

// START GOING THROUGH FIELDS
function loadFields() {
    mapSwiper.removeAllSlides();
    var havePictures = false;
    $('#fieldsList').empty();

    for (var f = 0; f < entity.fields.length; f++) {
        var id = entity.fields[f]._id;
        var uniqueId = entity.fields[f].id;
        var fields = "";
        var valueText;
        switch (id) {
            case 4:
                if (isAvailableData(entity.fields[f].value.address) && domain.hidePublicMap == false) {
                    // REPORT LOCATION 
                    var maptext = entity.fields[f].value.address + ", " + entity.fields[f].value.country;
                    var buildLinkRequest = 'https://maps.googleapis.com/maps/api/staticmap?center=' + entity.fields[f].value.lat + ',' + entity.fields[f].value.lg + '&zoom=16&size=640x400&markers=color:blue%7Clabel:A%7C' + entity.fields[f].value.lat + ',' + entity.fields[f].value.lg + '&key=AIzaSyDXen_4H3O9I_f3mgJBfr1Ylr2CDQIKf8U';
                    fields = '<div class="row">' +
                        '<h3 class="titles col-xs-12">' + entity.fields[f].label + '</h3>' +
                        '<p class="col-xs-12">' + maptext + '</p>' +
                        '<img class="col-xs-12" src=' + buildLinkRequest + '>' +
                        '</div>';
                }
                break;

            case 6: // PICTURE
                if (isAvailableData(entity.fields[f].value)) {
                    if (entity.fields[f].hidden === false) {
                        mapSwiper.appendSlide('<div class="swiper-slide"><img src="' + checkHttps(entity.fields[f].value) + '"></div>');
                        havePictures = true;
                    }
                }
                break;

        }
        if (isAvailableData(fields)) {
            $('#fieldsList').append(fields);
        }
    }
    if (havePictures === true) {
        $('.swiper-container').show();
    } else {
        $('.swiper-container').hide();
    }
   
} */


/*----------------------------------
    CHECK IF VARIABLE NOT NULL OR EMPTY
----------------------------------*/

$('#commentForm').on('submit', function(e) {
    e.preventDefault(); //prevent form from submitting 
    $('#commentButton').hide();
    $('#commentLoading').show();
    var data = $(this).find('textarea[name="commentText"]').val();
    if (data == null || data == "" || data == "undefined") {
        $('#commentButton').show();
        $('#commentLoading').hide();
        $("#errorNullComment").show();
    } else {
        $("#errorNullComment").hide();
        var comment = new Object();
        comment.text = data;
        if (entity.comments != null) {
            entity.comments.push(comment);
        } else {
            entity.comments = [comment];
        }
        var newEntity = new Object();
        newEntity.client_id = client_id;
        newEntity.entity = entity;
        var jsonString = JSON.stringify(newEntity);
        doRequestNoHeader(baseRoot + "SaveEntity", jsonString, function() {
            $('#commentForm').each(function() {
                this.reset();
            });
            createComment(data);
            $('#commentButton').show();
            $('#commentLoading').hide();
        });
    }
});

/*----------------------------------
    SWITCH VIEW
----------------------------------*/
$('.navTop >div').click(function() {
    if ($(this).hasClass('active') === false) {
        // CLEAN ADD ASSIGN SELECTED TO TOGGLE
        var page = $(this).data('link');
        $('.navTop>div').not(this).removeClass('active');
        $(this).addClass('active');
        // CHANGE VIEW
        $('.views>div').not(this).removeClass('active');

        if (page == "reportsView") {
            $('#mapInfo').addClass('map');
        } else {
            $('#mapInfo').removeClass('map');
        }
        $('#' + page).addClass('active');
        closeInfo();

        if (page == "reportsView") {
            setTimeout(function() {
                resizeMap();
            }, 300);
        } else if (page == "galleryView") {
            $grid.masonry('layout');

        }
    }

});


$('.toolBar >div').click(function() {
    var link = $(this).data('link');
    var page = $('#' + link);
    if ($(this).hasClass('active') === false) {
        $('.toolBar>div').not(this).removeClass('active');
        $(this).addClass('active');
        $('.filterItem').not(page).removeClass('active');
        page.addClass('active');
    } else {
        page.removeClass('active');
        $(this).removeClass('active')
    }
});

/*----------------------------------
    DATE FILTER
----------------------------------*/

$('#clock button').click(function() {
    var clicked = $(this);
    $(clicked).addClass('active');
    var unit = $(clicked).data('unit');
    var value = $(clicked).data('value');
    $('#clock button').not(clicked).removeClass('active');
    //var from=moment().valueOf() -moment().subtract(value,unit).valueOf();
    var from = null;
    if (unit != "all") {
        from = moment().subtract(value, unit).valueOf();
    }
    $('#clock').removeClass('active');
    $("[data-link='clock']").removeClass('active');
    callEntities(from);
});


function closeInfo() {
    $('#closeInfo').removeClass('opened');
    $('#moreInfoContainer').fadeOut();
    var mapHeight = $("#map").data('height');
    var infoHeight = 100 - mapHeight;
    var infoTop = "100%";

    if ($('#mapInfo').hasClass('map') === true) {
        infoTop = "70%";
    }

    $("#mapInfo").animate({
        height: "30%",
        top: infoTop
    }, {
        queue: false,
        duration: 800
    });

    $("#map").animate({
        height: "70%"
    }, {
        queue: false,
        duration: 800
    });

}

function initMapSwiper() {
    $('.swiper-map').height(parseInt($(window).height() / 1.4));
    mapSwiper = new Swiper('.swiper-map', {
        pagination: '.swiper-map-pagination',
        slidesPerView: 1,
        centeredSlides: true,
        paginationClickable: true
    });
}


$('#newInitiative').click(function(e){
    e.preventDefault();
    $('html,body').animate({
        scrollTop: $("#gth_form").offset().top -100
    },'slow');
    setTimeout(function() {
        $('#editReportField0').focus();
    },100);
});





/*----------------------------------
    CHECK IF VARIABLE NOT NULL OR EMPTY
----------------------------------*/
function isAvailableImageSrc(url, callback) {
    if (url !== null && url != "undefined") {
        var imgSize = new Image();
        imgSize.onerror = function() {
            callback.call('../assets/img/logo-topbar.png');
        };

        imgSize.onload = function() {
            callback.call(url);
        };
        imgSize.src = url;

    } else {
        callback.call('../assets/img/logo-topbar.png');
    }
}

/*----------------------------------
    CHECK IF VARIABLE NOT NULL OR EMPTY
----------------------------------*/
function isAvailableData(value) {
    if (typeof value != "undefined" && value !== null && value !== "") {
        return true;
    } else {
        return false;
    }
}

/*----------------------------------
    CHECK IF VARIABLE NOT NULL OR EMPTY
----------------------------------*/
function isAvailableString(value) {
    if (typeof value != "undefined" && value !== null && value !== "") {
        return value;
    } else {
        return " ";
    }
}

/*----------------------------------
    CHECK IF IMAGE LINK EXISTS
----------------------------------*/
function isAvailableImage(value) {
    if (typeof value != "undefined" && value !== null && value !== "") {
        return 'image/' + value;
    } else {
        return "../assets/img/logo-topbar.png";
    }
}



function checkHttps(url) {
    return url.replace(/^http:\/\//i, 'https://');
}


/*----------------------------------
    STATS NAV
----------------------------------*/
$('.navStats svg').click(function() {
    var id = $(this).attr('id');
    var width = $(window).width();
    var left = parseInt($('#statsPages').css('x'));
    var pageIndex = $('#statsPages').data('index');
    if (id == "navBack") {
        pageIndex--;
        left = left + width;
    } else {
        pageIndex++;
        left = left - width;
    }
    if (pageIndex == 1) {
        $('#navBack').fadeOut();
        $('#navForward').fadeIn();
    } else if (pageIndex == numberOfGraphs) {
        $('#navForward').fadeOut();
        $('#navBack').fadeIn();
    }
    $('#statsPages').data('index', pageIndex);
    $('#statsPages').transition({ x: left });
    var $page = $("#statsPages .page").eq(pageIndex - 1);
    var graph = $page.data('graph');
    var status = $page.data('status');
    $page.scrollTop(0);
    if (status != "loaded") {
        $('.loading').fadeIn();
        loadChart(graph, function() {
            $('.loading').fadeOut();
            $("#statsPages .page").eq(pageIndex - 1).data('status', 'loaded');
        });
    }

});




/*----------------------------------
    SOCIALS

window.fbAsyncInit = function() {
    FB.init({
        appId: '1434226826877094',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.3'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return; }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

----------------------------------*/

function postToFeed(title, cap, desc, url, image) {
    var obj = {
        method: 'feed',
        link: url,
        picture: image,
        name: title,
        description: desc,
        caption: cap,
        redirect_uri: url

    };

    function callback(response) {}
    FB.ui(obj, callback);
}


function checkSocials(index) {
    // TWITTER AND FACEBOOK BUTTONS 
    if (checkSourceAvailable(obj.domains[index].fb_text) == false) {
        $('.fb_share').hide();
    } else {
        $('.fb_share').show();
    }
    if (checkSourceAvailable(obj.domains[index].twitter_text) == false) {
        $('.tw_share').hide();
    } else {
        $('.tw_share').show();
    }
}



function buildTwitterMessage(entity) {
    var link = 'https://twitter.com/share?';
    var via = 'via=qader';

    var text;
    if (checkSourceAvailable(entity.twitter_text)) {
        text = jQuery('<p>' + entity.twitter_text + '</p>').text();
    } else if (checkSourceAvailable(entity.map_text)) {
        text = jQuery('<p>' + entity.summary_text + '</p>').text();
    } else {
        text = window.location.href;
    }
    var cap = moment(entity.insert_time).format('LLL');
    link = link + '&' + text + '&' + via;
    $('.twitter').attr('href', link);
}


function buildFbMessage(entity) {
    var text;
    if (checkSourceAvailable(entity.fb_text)) {
        text = jQuery('<p>' + entity.fb_text + '</p>').text();
    } else if (checkSourceAvailable(entity.map_text)) {
        text = jQuery('<p>' + entity.summary_text + '</p>').text();
    } else {
        text = window.location.href;
    }
    image = entity.picture_url;
    var postLink = window.location.href;
    $('.fb_share').data('desc', text);
    $('.fb_share').data('image', image);
    $('.fb_share').data('postLink', postLink);
}

$('.fb_share').click(function(e) {
    e.preventDefault();
    var title = "Qader Report";
    var cap = $(this).data('cap');
    var desc = $(this).data('desc');
    var postLink = $(this).data('postLink');
    var image = $(this).data('image');
    postToFeed(title, cap, desc, postLink, image);
});
