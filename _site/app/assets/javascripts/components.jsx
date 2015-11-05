//= require_tree ./components
      var SearchBar = React.createClass({
        wumpus: function() {
          this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
          )
        },
        render: function() {
            return (
                <form>
                  <input
                    type="text"
                    placeholder="Search..."
                    ref = "filterTextInput" //refering to filterTextInput
                    onChange = {this.wumpus} />
                </form>
            );
        }
      });

      var VideoRow = React.createClass({
        render: function() {
            var ytLink = this.props.video.video_link
            var ytLink = ytLink.replace("watch?v=", "v/");
            console.log(ytLink)
            return (
                <tr>
                    <td></td>
                    <td>Video Title: {this.props.video.title}</td>
                    <td><iframe width="640" height="315" src={ytLink} frameBorder="0" allowFullScreen></iframe></td>
                </tr>
                );
            }
        });



      var VideoTable = React.createClass({
        render: function() {
          var rows = [];
          console.log(this.props)
          var filterText = this.props.filterText;
          this.props.videos.forEach(function(video) {
              if (video.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) { return;}
              else if (this.props.filterText === "") {return ;}
              rows.push(<VideoRow video={video} key={video.name} />);
          }.bind(this));
          return (
              <table>
                  <tbody>{rows}</tbody>
              </table>
          );
        }
      });

      var FilterableVideoTable = React.createClass({
        handleUserInput: function(wumpus) {
          this.setState({
            filterText: wumpus
          })
        },
        getInitialState: function() {
          userVids = []
          for (var key in this.props) {
              userVids.push(this.props[key]);
          }
          return {filterText: '',
                  videos: userVids
                }
        },
        render: function() {
            console.log('videos file')
            console.log(this.state)
            //console.log(this.props)
            return (
                <div>
                    <SearchBar
                      filterText={this.state.filterText}
                      onUserInput={this.handleUserInput} />
                    <VideoTable
                      videos={this.state.videos}
                      filterText={this.state.filterText} />
                </div>
            );
        },
        componentDidMount: function() {
          $.get(this.props.source, function(result) {

          })
        }
      });
    React.render(<FilterableVideoTable />, document.header);

