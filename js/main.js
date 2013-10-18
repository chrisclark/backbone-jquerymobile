window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page1View = Backbone.View.extend({

    template:_.template($('#page1').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page2View = Backbone.View.extend({

    template:_.template($('#page2').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "page1":"page1",
        "page2":"page2"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').on('click', function(event) {
            window.history.back();
            return false;
        });
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },

    page1:function () {
        console.log('#page1');
        this.changePage(new Page1View());
    },

    page2:function () {
        console.log('#page2');
        this.changePage(new Page2View(), 'dialog');
        //jQuery mobile's default back button will not work correctly, so we need to explicitly
        //set the back button location here. This is a fairly brutal hack and makes dialogs a lot less reusable
        //but works in a pinch.
        //return $('a[title="Close"]').attr("href", "#page1");
    },

    changePage: function(page, role) {
        if (typeof role === 'undefined' || (role == null)) {
            role = 'page';
        }
        $(page.el).attr('data-role', role);
        page.render();
        $('body').append($(page.el));
        return $.mobile.changePage($(page.el), {
            changeHash: false
        });
    }
});

$(function() {
    $.support.cors = true;
    app = new AppRouter();
    //this 'if' can help with test runners (jasmine can sometimes try to load this twice)
    if (!Backbone.History.started) { 
        return Backbone.history.start();
    }
});
