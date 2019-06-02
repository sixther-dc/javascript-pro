function dragServiceName() {
    return {
        restrict: "A",
        link($scope, element) {
            $(element).mousedown(function () {
                $(".cf-sidebar-service-item").off('mouseenter').unbind('mouseleave');
                document.onselectstart = function () {
                    return false;
                }
                var dragEle = $(this).parent().parent().parent();
                dragEle[0].style.zIndex = 101;
                dragEle.addClass("cf-sidebar-service-row-drag");
                // dragEle[0].classList.add("cf-sidebar-service-row-drag");
                var liHeight = parseInt(getComputedStyle(dragEle[0], null).height);
                var eleTop = $(dragEle).offset().top;
                //获取li的元素集合
                var liList = $($(".cf-sidebar-collection-service")[0]).children("li");
                var liLength = liList.length;
                var positionTable = Array.from({
                    length: liLength
                }, (v, k) => k);
                console.log(positionTable);
                //记录第一个元素的高度
                var firstLiOffsetTop = $(liList[0]).offset().top + liHeight / 2;
                //记录基准点的高度
                var currentEleDisplayOffsetTop = eleTop + liHeight / 2;
                //记录基准点位置
                var currentIndex = liList.index(dragEle);
                document.onmousemove = function (e) {
                    $('#cf-service-sidebar').removeClass('cf-sidebar-mini');
                    var event = e || window.event;
                    var pageY = event.pageY;
                    dragEle[0].style.transform = 'translate(0px, ' + (pageY - firstLiOffsetTop) +
                        'px)';
                    //处理下移
                    if (((pageY - currentEleDisplayOffsetTop) > liHeight / 2) && (currentIndex <
                            liLength - 1)) {
                        //移动超过半个身位，基准点加一个元素身位
                        currentEleDisplayOffsetTop += liHeight;
                        //计算当前基准点的位置
                        currentIndex = (currentEleDisplayOffsetTop - firstLiOffsetTop) / liHeight;
                        //移动当前基准点位置中的元素的Y轴坐标
                        liList[positionTable[currentIndex]].style.transform = 'translate(0px, ' + ((
                            currentIndex - 1) * liHeight) + 'px)';
                        //基准点的元素跟上一个元素换位
                        [positionTable[currentIndex], positionTable[currentIndex - 1]] = [
                            positionTable[currentIndex - 1],
                            positionTable[currentIndex]
                        ];
                    }
                    //处理上移
                    if (((currentEleDisplayOffsetTop - pageY) > liHeight / 2) && (currentIndex > 0)) {
                        currentEleDisplayOffsetTop -= liHeight;
                        currentIndex = (currentEleDisplayOffsetTop - firstLiOffsetTop) / liHeight;
                        liList[positionTable[currentIndex]].style.transform = 'translate(0px, ' + ((
                            currentIndex + 1) * liHeight) + 'px)';
                        [positionTable[currentIndex], positionTable[currentIndex + 1]] = [
                            positionTable[currentIndex + 1],
                            positionTable[currentIndex]
                        ];
                    }
                };
                document.onmouseup = function (e) {
                    $scope.$emit("test", positionTable);
                    // $rootScope.favoriteEndpoints = a;
                    dragEle[0].style.transform = 'translate(0px, ' + currentIndex * liHeight +
                        'px)';
                    document.onmousemove = null;
                    dragEle[0].style.zIndex = 100;
                    dragEle[0].style.top = 0;
                    document.onmouseup = null;
                    dragEle.removeClass("cf-sidebar-service-row-drag");
                    $(".cf-sidebar-service-item").hover(function () {
                        $(this).addClass("cf-sidebar-service-row-hover");
                        $(this).children(".cf-sidebar-toolbar").css("display", "inline-block");
                    }, function () {
                        $(this).children(".cf-sidebar-toolbar").css("display", "none");
                        $(this).removeClass("cf-sidebar-service-row-hover");
                    });
                    $(dragEle).children(".cf-sidebar-toolbar").css("display", "none");
                    var event = e || window.event;
                    var pageX = event.pageX;
                    if (pageX > 240) {
                        setTimeout(function () {
                            $('#cf-service-sidebar').addClass('cf-sidebar-mini');
                        }, 800)
                    }

                }
            })
        }
    }
};

function cfSidebarCollectionItem() {
    return {
        restrict: "A",
        link($scope, element) {
            $(element).hover(function () {
                $(this).addClass("cf-sidebar-service-row-hover");
                $(this).children(".cf-sidebar-toolbar").css("display", "inline-block");
            }, function () {
                $(this).children(".cf-sidebar-toolbar").css("display", "none");
                $(this).removeClass("cf-sidebar-service-row-hover");
            })
        }
    }
}

function cfDragRemoveService($rootScope, $timeout) {
    return {
        restrict: "A",
        link($scope, element, attrs) {
            var liEle = element.parent().parent().parent();
            $timeout(() => {
                liEle.css({
                    "transition": "all .2s ease-out 0s"
                });
            })
            // liEle.removeClass("cf-sidebar-service-row-enter");
            $(element).click(function () {
                // $(".cf-sidebar-service-row").css({
                //     "transition": "all .2s ease-out 0s"
                // });
                let index = parseInt(attrs.index);
                liEle.stop().animate({
                    opacity: '0',
                    left: '-240px'
                }, 200, function () {
                    // $scope.$evalAsync(() => {
                    //     $rootScope.favoriteEndpoints.splice(index, 1)
                    // })
                    $timeout(() => {
                        $rootScope.favoriteEndpoints.splice(index, 1)
                    }, 200)
                });
            })
        }
    }
}

cfDragRemoveService.$inject = ["$rootScope", "$timeout"]
export {
    dragServiceName,
    cfSidebarCollectionItem,
    cfDragRemoveService
};