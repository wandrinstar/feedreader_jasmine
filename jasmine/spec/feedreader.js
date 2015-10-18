// Tests app.js

$(function() {
    //Confirms data is defined and not empty.
    //Trying to read length of undefined and null raises error so that should work.
    describe('RSS Feeds', function() {
        function hasValue(variable) {
            expect(variable).toBeDefined();
            expect(variable).not.toBe(null);
            expect(variable.length).not.toBe(0);
        }
        //Could use hasValue but according to the original comments this function was not to modified.
        it('Are defined.', function() {
            expect(allFeeds).hasValue();
            expect(allFeeds.length).not.toBe(0);
        });
        it('Have defined, non-empty URLs.', function() {
            allFeeds.forEach(function(feed) {
                hasValue(feed.url);
            });
        });
        it('Have defined, non-empty NAMES.', function() {
            allFeeds.forEach(function(feed) {
                hasValue(feed.name);
            });
        });
    });

    //Confirms the menu hides and shows as expected.
    describe('The Menu', function() {
        it('Should be hidden by default.', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        it('Clicking the menu icon should toggle its visibility.', function() {
            var icon = $('.menu-icon-link');
            icon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            icon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    //Confirms content is displayed at page load.
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('There should be at least one initial entry.', function(done) {
            expect($('.feed').is(':empty')).toBe(false);
            done();
        });
    });

    //Confirms content changes when feed changes.
    describe('New Feed Selection.', function() {
        //Declare in outer scope so that we have access to it later.
        var originalFeedText;
        beforeEach(function(done) {
            //Set before loadFeed changes it.
            originalFeedText = $('.feed').text();
            loadFeed(1, function() {
                done();
            });
        });
        it('Feed content really does change after new feed is loaded.', function(done) {
            //Comparing original text to current text.
            expect(originalFeedText).not.toBe($('.feed').text());
            done();
        });
    });
});
