$(function() {
	var User = {
		img: 'brad.png',
		handle: '@bradwestfall'
	}

	var message = 'msg'

	var tweet = $('#template-tweet').html()
	var tweetTmpl = Handlebars.compile(tweet)

	var compose = $('#template-compose').html()
	var composeTmpl = Handlebars.compile(compose)

	var thread = $('#template-thread').html()
	var threadTmpl = Handlebars.compile(thread)

	function renderTweet(user, message) {

		var fields = {
			you: user,
			messagetxt: message
		}

		return tweetTmpl(fields)
	}

	function renderCompose() {

		return composeTmpl()
	}

	function renderThread(user, message) {
		var tweetHtml = renderTweet(User, message)
		var fields = {
			user: User,
			tweet: tweetHtml,
			compose: renderCompose()
		}
		
		return threadTmpl(fields)
	}
	 

	$('main').on('click', 'button', function() {
		var msg = $(this).parents('.compose').find('textarea').val()

		if ($(this).parents('.replies').length) {
			$(this).parents('.replies').append(renderTweet(User,msg))
		} else {
			$('.tweets').append(renderThread(User, msg))
		}


		$('textarea').val('')
		$(this).parents('.compose').removeClass('expand')
		return false
	})



	$('main').on('click', 'textarea', function() {
		$(this).parents('form').addClass('expand')
	})

	$('main').on('click', '.tweet', function() {
		$(this).parent('.thread').toggleClass('expand')
	})

	$('textarea').keypress(function(){

    	if(this.value.length > 140){
        	return false;
   		}
   		
    	$('.count').html(140 - this.value.length)
	})
})