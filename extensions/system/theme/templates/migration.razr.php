<!DOCTYPE html>
<html class="uk-height-1-1">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @action('head')
        @script('uikit')
        @style('theme', 'extension://system/theme/css/theme.css')
    </head>
    <body class="uk-height-1-1">

        <div class="tm-height-4-5 uk-vertical-align uk-text-center">
            <div class="uk-vertical-align-middle">

                <img class="tm-logo" src="@url.to('extension://system/assets/images/pagekit-logo-large.svg')" width="120" height="120" alt="Pagekit">

                <form class="uk-panel uk-panel-box tm-panel" action="@url.to('@system/migration/migrate')">
                    <h1>@trans('Update Pagekit')</h1>
                    <p>@trans('Pagekit has been updated! Before we send you on your way, we have to update your database to the newest version.')</p>
                    <p>
                        <button class="uk-button uk-button-primary" type="submit" value="">@trans('Update')</button>
                        @token()
                    </p>
                </form>

            </div>
        </div>

    </body>
</html>