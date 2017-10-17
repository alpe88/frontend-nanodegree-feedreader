/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function () {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('has URLs', function () {
			allFeeds.forEach(function (feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
				expect(feed.url).toEqual(jasmine.any(String));
			});
		});

		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('has names', function () {
			allFeeds.forEach(function (feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
				expect(feed.name).toEqual(jasmine.any(String));
			});
		});
	});

	/* TODO: Write a new test suite named "The menu". */
	describe('The menu', function () {
		/* TODO: Assign menu related elements to variables for access in tests. */
		var menu = $("body");
		var menuicon = $(".menu-icon-link");

		/* TODO: Write a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 *
		 * In review of the index.html file, menu-hidden class name
		 * is used to determine if the menu element is hidden or not.
		 */
		it('is hidden by default', function () {
			expect(menu.hasClass('menu-hidden')).toBe(true);
		});

		/* TODO: Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 *
		 * In review of the index.html page, after loading, visibility is determined
		 * by the presence of the associated menu-hidden class. The menu is closed
		 * by default so initial click removes the class, second click adds it back.
		 */
		it('changes visibility on click', function () {
			menuicon.trigger('click');
			expect(menu.hasClass('menu-hidden')).toBe(false);
			menuicon.trigger('click');
			expect(menu.hasClass('menu-hidden')).toBe(true);
		});
	});

	/* TODO: Write a new test suite named "Initial Entries". */
	describe('Initial Entries', function () {

		/* TODO: Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function (done) {
			loadFeed(0, done);
		});

		it('has one entry', function (done) {
			/* Element has to be called locally within this function after the data is returned
			 * from the ajax call.
			 */
			var entry = $(".feed .entry-link .entry");
			expect(entry.length).toBeGreaterThan(0);
			done();
		});
	});

	/* TODO: Write a new test suite named "New Feed Selection". */
	describe('New Feed Selection', function () {
		/* TODO: Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */

		/* Initialize feed related variables needed for test - an index as feed place-holder in feed array. */
		var index = 0;
		var feedsArr = [];

		/* For each feed loaded store entry in local feeds array, to be compared after async request is complete. */
		beforeEach(function (done) {
			loadFeed(index++, function () {
				var entry = $(".feed .entry-link .entry");
				feedsArr.push(entry);
				done();
				console.log(feedsArr);
			});
		});
		
		/* Check first that the initial feed even loaded. */
		it('first feed loads', function(done){
			var entry = $(".feed .entry-link .entry");
			expect(entry.length).toBeGreaterThan(0);
			done();
		});
		
		/* Check that next feed loaded is different than prior. */
		it('next feed loads', function(done){
			expect(feedsArr[0][0].innerHTML).not.toBe(feedsArr[0][1].innerHTML);
    		done();
			loadFeed(0);
		});
		
	});
}());
