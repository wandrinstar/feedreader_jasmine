// Tests app.js

$(function() {
    //Confirms data is defined and not empty.
    //Trying to read length of undefined and null raises error so that should work.
    describe('RSS Feeds', function() {
        it('Are defined.', function() {
            expect(allFeeds.length).not.toBe(0);
        });
        it('Have defined, non-empty URLs.', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url.length).not.toBe(0);
            });
        });
        it('Have defined, non-empty NAMES.', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name.length).not.toBe(0);
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
        var originalFeedText; // Declare in outer scope so that we have access to it later.
        beforeEach(function(done) {
            originalFeedText = $('.feed').text(); // Set before loadFeed changes it.
            loadFeed(1, function() {
                done();
            });
        });
        it('Feed content really does change after new feed is loaded.', function(done) {
            expect(originalFeedText).not.toBe($('.feed').text()); // Comparing original text to current text.
            done();
        });
    });
});
