/**
 * Created by ToothlessRebel on 12-May-16.
 */
function Guam(input) {
    input = input || {};
    var options = {
        debug: false,

        toString: function () {
            return '{debug: ' + this.debug + '}';
        }
    };

    var not_parsed = [
        'script'
    ];

    options = $.extend(options, input);

    var elements = {
        to_parse: function () {
            var top_level = $('body').children().filter(function (index, element) {
                return 0 > not_parsed.indexOf($(element).prop('tagName').toLowerCase());
            });

            var elements = top_level.toArray();

            $.each(top_level, function (index, element) {
                var $element = $(element);
                var tag = $element.prop('tagName');

                if (0 > not_parsed.indexOf(tag)) {
                    if (0 <= $element.children().length) {
                        $element.children().each(function (index, element) {
                            elements.push(element);
                        });
                    }
                }
            });

            return elements;
        },

        toString: function () {
            var elements = [];
            $.each(this.to_parse(), function (index, element) {
                elements.push($(element).prop('tagName').toLowerCase());
            });

            return '[' + elements.join(', ') + ']';
        }
    };

    var iterateElements = function () {
        $.each(elements.to_parse(), function (index, element) {
            var $element = $(element);
            var tag = $element.prop('tagName');

            if (0 > not_parsed.indexOf(tag)) {
                if (0 <= $element.children().length) {
                    $(elements).push($element.children());
                }
            }
        });

        return elements;
    };

    var translateElement = function (element) {
        var $element = $(element);
        console.log('Replacing:', $element.html());
        var translated = $element.html().replace(/(<.*?>\s*)*[a-zA-Z]+([.!?,])*(\s*<.*?>)*/g, ' $1guam$2$3 ');
        console.log('With:', translated);
        $element.html(translated);
    };

    this.translate = function () {
        $.each(elements.to_parse(), function (index, element) {
            translateElement(element);
        })
    };

    if (options.debug) {
        this.toString = function () {
            return 'Guam{options: ' + options.toString() + ', elements: ' + elements.toString() + ', not_parsed: ' + not_parsed + '}';
        }
    }

    elements.elements = iterateElements();
}
