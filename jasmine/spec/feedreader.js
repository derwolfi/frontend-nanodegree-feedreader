/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined and that the URL is not empty', function() {
            for(var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name defined and that the name is not empty', function() {
            for(var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    /* a test suite for the "The menu" */
    describe('The menu', function() {
        /* check body tag class if menu-hidden (true/false) */
        var bodyClass = function() {
            return $('body').hasClass('menu-hidden');
        };


        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('should be hidden by default', function() {
            expect(bodyClass()).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          * The menu is display when
          * clicked and hide when clicked again.
          */
        it('showes the menu when clicked the menu icon and does it hide when clicked again', function() {
            // First click on menu icon
            $('.menu-icon-link').trigger('click');
            expect(bodyClass()).toBe(false);

            // Second click on menu icon
            $('.menu-icon-link').trigger('click');
            expect(bodyClass()).toBe(true);
        });

    });



    /* A test suite for "Initial Entries" */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * The loadFeed() is asynchronous.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });


        it('should have at least one single entry element in the feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });



    /* A test suite for "New Feed Selection" */

    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * The loadFeed() is asynchronous.
         */

        beforeEach(function(done) {
            loadFeed(1, done);
        });

        /* A content change test */
        it('should change the content', function(done) {
            var feedContent = $('.feed').html();
            loadFeed(2, function() {
                expect($('.feed').html()).not.toBe(feedContent);
                done();
            });
            expect(feedContent).not.toBe('');
        });

        afterEach(function(done) {
            loadFeed(0, done);
        });
    });

}());
