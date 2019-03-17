var $file = $("#choose-file"),
    $list = $('.file-list'),
    fileList = [];
var curFile;
$file.on('change', function (e) {
    var numold = $('li').length;
    curFile = this.files;
    console.log(numold);
    fileList = fileList.concat(Array.from(curFile));
    for (var i = 0, len = curFile.length; i < len; i++) {
        reviewFile(curFile[i])
    }
    $('.file-list').fadeIn(2500);
})


function reviewFile(file) {
    var fd = new FileReader();
    var fileType = file.type;
    fd.readAsDataURL(file); //base64
    fd.onload = function () {
        if (/^image\/[jpeg|png|jpg|gif]/.test(fileType)) {
            $list.append('<li style="border:solid red px; margin:5px 5px;" class="file-item"><img src="' + this.result + '" alt="" height="70"><span class="file-del">删除</span></li>').children(':last').hide().fadeIn(2500);
        } else {
            $list.append('<li class="file-item"><span class="file-name">' + file.name + '</span><span class="file-del">删除</span></li>')
        }
    }
}

$(".file-list").on('click', '.file-del', function () {
    let $parent = $(this).parent();
    let index = $parent.index();
    fileList.splice(index, 1);
    $parent.fadeOut(850, function () {
        $parent.remove()
    });
});