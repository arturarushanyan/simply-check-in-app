import React from 'react';
import moment from 'moment';

//List that renders near-by check-in data
export default (props) => {
      return (
          <div className="recent-check-ins">
              <h4 className="text-center">Recent check-ins nearby</h4>

              <table className="table">
                  <tbody>{
                      props.data.map((user)=> {
                          let hoursDiff = moment.duration(moment().diff(user.checkInTime)).asHours();
                          return (
                              <tr key={user.id}>
                                  <td className="text-info"><u>{user.name}</u></td>
                                  <td>{`${Math.round(user.distanceFromCurrentUser * 1000) / 1000}km`}</td>
                                  <td className="text-right">{`${Math.round(hoursDiff * 10) / 10}hrs`}</td>
                              </tr>
                          )
                      })
                  }
                  </tbody>
              </table>
          </div>
      )
}