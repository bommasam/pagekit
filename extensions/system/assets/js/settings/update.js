require(['jquery', 'domReady!'], function($) {

    var page = $('#js-update'), params = page.data();

    // query for update
    $.post(params.api + '/update', function(data) {

        $('.js-version', page).each(function() {

            var $this = $(this);

            if ($this.is('a')) {
                $this.attr('href', data.latest.url);
            }

            $this.text($this.text().replace(/%version%/, data.latest.version));
        });

        $('.js-install', page).on('click', function(e) {
            e.preventDefault();
            show('update-install');
            step(params.url, {'update': JSON.stringify(data.latest)});
        });

        if (data.latest.version != params.version) {
            show('update-available');
        } else {
            show('no-updates');
        }

    }, 'jsonp').fail(function(e) {

        show('no-connection');

    });

    function show(message) {

        page.find('[data-msg]').each(function() {

            var $this = $(this);

            if ($this.data('msg') === message) {
                $this.removeClass('uk-hidden');
            } else {
                $this.addClass('uk-hidden');
            }

        });

    }

    function step(url, data) {

        var message = $('.js-message', page), progress = $('.js-progress', page);

        $.getJSON(url, data || {})
            .success(function(data) {

                if (data.error) {
                    progress.addClass('uk-progress-danger');
                    message.before($('<div class="uk-alert uk-alert-danger">' + data.error + '</span>'));
                }

                if (data.message) {
                    message.text(data.message);
                }

                if (data.progress) {

                    if (data.progress == '100') {
                        progress.addClass('uk-progress-success');
                    }

                    progress.find('.uk-progress-bar').css('width', data.progress + '%');
                }

                if (data.step) {
                    step(data.step);
                }

                if (data.redirect) {

                    setTimeout(function() {
                        window.location = data.redirect;
                    }, 1000);

                }

            })
            .error(function(result) {
                progress.addClass('uk-progress-danger');
                progress.removeClass('uk-active');
                message.before($('<div class="uk-alert uk-alert-danger">@trans("Ooops. Something went wrong.")</span>'));
            });
    }

});