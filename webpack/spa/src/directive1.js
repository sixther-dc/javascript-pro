function directive1() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        scope: {
            title:'=title'
        },
        // template: "<div>I am a directive</div>",
        template: require("./directive1.html"),
        link: function(scope, elememt, attrs) {
            console.log(scope, "ssss");
            console.log(elememt, "eeeeee");
            console.log(attrs, "aaaaa");
            scope.showMe = true;
            scope.toggle = function() {
                console.log("I am toggle function from directive1");
                scope.showMe = !scope.showMe;
            }
        }
    }
}
export default directive1;