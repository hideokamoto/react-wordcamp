// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var Central = React.createClass({
	getWordCampInfoFromPostmeta: function(){
		var post_meta = this.props.post.post_meta;
		var wcdata = [];
		for (var i = 0; i < post_meta.length; i++) {
			wcdata[post_meta[i].key] = post_meta[i].value;
		}
		return wcdata;
	},
	render: function() {
		var wcdata = this.getWordCampInfoFromPostmeta();
		var nowDate = new Date();
		var startDate = new Date(wcdata["Start Date (YYYY-mm-dd)"]* 1000 );
		var pastEventClass = '';
		if( startDate.getTime() < nowDate.getTime()) {
			pastEventClass = 'info';
		}
		wcdata["Start Date"] = startDate.toLocaleString();
		if( wcdata["End Date (YYYY-mm-dd)"] ) {
			wcdata["End Date"] = new Date(wcdata["End Date (YYYY-mm-dd)"]* 1000 ).toLocaleString();
		} else {
			wcdata["End Date"] = 'No data';
		}
		return(
			<tr className={pastEventClass}>
				<td className="page-header">{this.props.post.title}</td>
				<td><a href={wcdata["URL"]}>{wcdata["URL"]}</a></td>
				<td>{wcdata["Location"]}</td>
				<td>{wcdata["Venue Name"]}</td>
				<td>{wcdata["Physical Address"]}</td>
				<td>{wcdata["Start Date"]}</td>
				<td>{wcdata["End Date"]}</td>
				<td>{wcdata["Number of Anticipated Attendees"]}</td>
			</tr>
		);
	}
});

var CentralList = React.createClass({
	parseStartDate: function( postData ) {
		for( var j = 0; j < postData.length; j++){
			var post_meta = postData[j].post_meta;
			for (var i = 0; i < post_meta.length; i++) {
				if(post_meta[i].key === "Start Date (YYYY-mm-dd)"){
					postData[j]['startDate'] = post_meta[i].value;
				}
			}
		}
		return postData;
	},
	sortByStartDate: function() {
		var postData = this.parseStartDate(this.props.postData);
		var key = "startDate";

		//ASC
		var num_a = 1;
		var num_b = -1;

		//DESC
		num_a = -1;
		num_b = 1;

		var data = postData.sort(function(a, b){
			var x = a[key];
			var y = b[key];
			if (x > y) return num_a;
			if (x < y) return num_b;
			return 0;
		});
		return data;;
	},
	render: function() {
		var eventData = this.sortByStartDate();
		var centralNodes = eventData.map(function (post) {
			return (
				<Central post={post} key={post.ID}/ >
			);
		});
		return (
			<table className="wcList table-hover table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>WebSite</th>
						<th>Place</th>
						<th>Venue Name</th>
						<th>Physical Address</th>
						<th>Start Date</th>
						<th>End Date</th>
						<th>Number of Anticipated Attendees</th>
					</tr>
				</thead>
				<tbody>
					{centralNodes}
				</tbody>
			</table>
		);
	}
});

var CentralBox = React.createClass({
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
			<CentralList postData={this.state.data} />
		);
	}
});

module.exports = CentralBox;
