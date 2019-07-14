var index = 0;
var projects = $('#projects');
var right = $('.right');
var leftHolder = $('.left-holder');
var middleHolder = $('.middle-holder');
var rightHolder = $('.right-holder');
var projectCount;
var cellSize;

$(window).on('load', function() {
    if (window.width < 900) {
        var width = middleHolder.width();
        projects.children().width(width - 10);
    }

    projectCount = projects.children().length;
    adjustHeight();
    getCellSize();
});

$(window).on('resize', function() {
    getCellSize();

    if (window.width < 900) {
        var width = middleHolder.width();
        projects.children().width(width - 10);
    }
    else
        projects.children().css('width', '');

    projects.css({
        transform: 'translateX(-' + index * cellSize + 'px)'
    });

    adjustHeight();
});

$('#previous').click(function() {
    if (index > 0) {
        index--;
        projects.css({
            transform: 'translateX(-' + index * cellSize + 'px)'
        });
        adjustHeight();

        if (index == 0)
            $('.left-holder').children(0).addClass('fade');
        else if (index == projectCount - 2)
            $('.right-holder').children(0).removeClass('fade');
    }
});

$('#next').click(function() {
    if (index < projectCount - 1) {
        index++;
        projects.css({
            transform: 'translateX(-' + index * cellSize + 'px)'
        });
        adjustHeight();

        if (index == 1)
            $('.left-holder').children(0).removeClass('fade');
        else if (index == projectCount - 1)
            $('.right-holder').children(0).addClass('fade');
    }
});

$('#fav-colour').click(function(e) {
    if (this.innerHTML.startsWith('#'))
        this.innerHTML = 'rgb(0, 204, 255)';
    else if (this.innerHTML.startsWith('rgb'))
        this.innerHTML = 'hsv(192, 100, 100)';
    else if (this.innerHTML.startsWith('hsv'))
        this.innerHTML = '#00CCFF';
});

function adjustHeight() {
    if (window.width < 900) {
        middleHolder.height(projects.children().eq(index).height() + 10);
        return;
    }

    leftHolder.height(projects.children().eq(index).height() + 10);
    middleHolder.height(projects.children().eq(index).height() + 10);
    rightHolder.height(projects.children().eq(index).height() + 10);
    right.css({
        top: 'calc(50% - ' + (Math.floor(projects.children().eq(index).height() * 0.5) + 41) + 'px)'
    });
}

function getCellSize() {
    if (window.width >= 1280)
        cellSize = 504;
    else if (window.width >= 1040)
        cellSize = 404;
    else if (window.width >= 900)
        cellSize = 384;
    else
        cellSize = middleHolder.width() + 4;
}