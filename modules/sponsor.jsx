// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var SponsorSite = React.createClass({
	render: function() {
		return(
			<a href={this.props.data[0]['value']}>
				{this.props.data[0]['value']}
			</a>
		);
	}
});

var Sponsor = React.createClass({
	render: function() {
		var sponsorSite = '';
		if( this.props.post.post_meta[0] ) {
			sponsorSite = <SponsorSite data={this.props.post.post_meta} />;
		}
		return(
			<div>
				<h2 className="page-header">{this.props.post.title}</h2>
				<dl>
					<dt>Sponsor Lebel</dt>
					<dd>{this.props.post.terms.wcb_sponsor_level[0]['name']}</dd>
					<dt>Sponsor WebSite</dt>
					<dd>{sponsorSite}</dd>
				</dl>
				<div dangerouslySetInnerHTML={{__html: this.props.post.content}} />
			</div>
		);
	}
});

var SponsorList = React.createClass({
	render: function() {
		var sponsorNodes = this.props.postData.map(function (post) {
			return (
				<Sponsor post={post} key={post.ID}/ >
			);
		});
		return (
			<ul className="postList list-group">
				{sponsorNodes}
			</ul>
		);
	}
});

var SponsorBox = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			url: this.props.apiUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function() {
		this.loadPostsFromServer();
	},
	render: function() {
		return (
			<SponsorList postData={this.state.data} />
		);
	}
});

module.exports = SponsorBox;
