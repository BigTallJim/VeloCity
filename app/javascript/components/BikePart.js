import React, { Component } from 'react'
import ls from 'local-storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'


class BikePart extends Component {
  constructor(props) {
    super(props);
    const { part } = props
    // this.state = {id: ""}
    this.deletePart = this.deletePart.bind(this);
  }

    deletePart(event) {
      if(confirm("Are you sure you wish to delete?") === true) {
        const url = `/api/v1/components/destroy?comp_id=${this.props.part.id}`;
        fetch(url, {
          method: 'GET',
          headers: {"Authorization": ls.get('authorization')}
            })
          .then(response => {
            if (response.ok) {
                    // return response.json();
              console.log(response)
            }else{
              throw new Error("Network response was not ok.");
              }
            })
            .then(reload => window.location.reload())
      }
    }

  render() {
    const { part } = this.props
    const trashIcon = <FontAwesomeIcon icon={faTrash} />

    function percentWorn(part) {
      return (( part.distance_done / part.max_distance ) * 100).toFixed()
    }

    function wornColour(part) {
      if(percentWorn(part) < 75) {
        return {backgroundColor: "green"}
      }
      else if(percentWorn(part) < 100) {
        return {backgroundColor: "orange"}
      }
      else {
        return {backgroundColor: "red"}
    };
  };

  return (
    <div>
      <div style={wornColour(part)}>
        Component: {part.comp_name} <br/>
        Distance done:{part.distance_done}m <br/>
        Recommended maximum: {part.max_distance}m <br/>
        Percentage worn: { percentWorn(part) }%
      </div>
      <div>
        <button onClick={this.deletePart}>{trashIcon}</button>
      </div>
    </div>
  )};
}

export default BikePart
