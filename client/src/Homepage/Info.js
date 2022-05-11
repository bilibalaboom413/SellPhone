import React from "react";
import axios from "axios";

class Info extends React.Component {
  state = {
    phones: [],
    reviews: [],
    quantity: 0,
    prevPhone: {
      id: "",
      quantity: 0,
    },
    inputQuantity: false,
    commentInput: "",
    ratingInput: 5,
    userid: "",
    username: "",
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state.phoneid = props.phoneid;
    this.state.userid = props.userid;
    this.getInfo();
    this.getreview();
  }

  // Add the cart information in localStorage
  componentDidUpdate() {
    if (!isNaN(this.state.quantity) && this.state.quantity > 0) {
      const id = this.state.phones[0]._id;
      const title = this.state.phones[0].title;
      const price = this.state.phones[0].price;
      const phone = {
        id: id,
        title: title,
        price: price,
        addedQuantity: this.state.quantity,
      };
      let numOfCategory = localStorage.getItem("numOfCategory");
      if (localStorage.getItem("numOfCategory")) {
        if (this.state.prevPhone.id !== this.state.phones[0]._id) {
          localStorage.setItem("numOfCategory", parseInt(numOfCategory) + 1);
          this.setState({
            prevPhone: {
              id: phone.id,
              quantity: phone.addedQuantity,
            },
          });
        }
        numOfCategory = localStorage.getItem("numOfCategory");
        localStorage.setItem(numOfCategory, JSON.stringify(phone));
      } else {
        localStorage.setItem("numOfCategory", 1);
        localStorage.setItem(1, JSON.stringify(phone));
        this.setState({
          prevPhone: {
            id: phone.id,
            quantity: phone.addedQuantity,
          },
        });
      }
    }
  }

  getInfo = async () => {
    const { phoneid } = this.state;
    axios
      .get("http://localhost:8000/phoneinfo", {
        params: {
          id: phoneid,
        },
      })
      .then((_d) => {
        this.setState({ phones: _d.data });
      });
  };
  getreview = async () => {
    const { phoneid } = this.state;
    axios
      .get("http://localhost:8000/getreview", {
        params: {
          id: phoneid,
        },
      })
      .then((_d) => {
        this.setState({ reviews: _d.data });
      });
  };
  getallreview = async () => {
    const { phoneid } = this.state;
    axios
      .get("http://localhost:8000/allreview", {
        params: {
          id: phoneid,
        },
      })
      .then((_d) => {
        this.setState({ reviews: _d.data });
      });
  };
  addReview = async () => {
    const { phoneid, userid, commentInput, ratingInput } = this.state;
    axios
      .get("http://localhost:8000/addreview", {
        params: {
          id: phoneid,
          userId: userid,
          rating: ratingInput,
          comment: commentInput,
        },
      })
      .then((_d) => {
        this.getallreview();
      });
  };
  FinduserName = async (userid) => {
    // const {userid} = this.state;
    axios
      .get("http://localhost:8000/finduser", {
        params: {
          id: userid,
        },
      })
      .then((_d) => {
        this.setState({ username: _d.data });
      });
  };
  handleGetComment = (event) => {
    this.setState({
      commentInput: event.target.value,
    });
  };
  handleGetRating = (event) => {
    this.setState({
      ratingInput: event.target.value,
    });
  };

  handleInputQuantity = (e) => {
    const tmp = e.target.value;
    if (!isNaN(tmp) && tmp > 0) {
      this.setState({ quantity: parseInt(tmp) });
    } else if (!tmp) {
      this.setState({ inputQuantity: false });
    } else {
      alert("Please input a valid quantity!");
    }
    this.setState({ inputQuantity: false });
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <button onClick={this.props.closePopup}>close me</button>
          <table>
            <thead>
              <th>title</th>
              <th>brand</th>
              <th>image</th>
              <th>stock</th>
              <th>seller</th>
              <th>price</th>
            </thead>
            <tbody>
              {this.state.phones.map((phone) => (
                <tr key={phone._id}>
                  <td>{phone.title}</td>
                  <td>{phone.brand}</td>
                  <td>{phone._id}</td>
                  <td>{phone.stock}</td>
                  <td>{phone.seller}</td>
                  <td>{phone.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <th>reviewer</th>
              <th>rating</th>
              <th>comment</th>
            </thead>
            <tbody>
              {this.state.reviews.map((review) => (
                <tr>
                  <td>{review.reviews.reviewer}</td>
                  <td>{review.reviews.rating}</td>
                  <td>{review.reviews.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <label>current added quantity: </label>
            <span className="added-quantity">{this.state.quantity}</span>
            {this.state.inputQuantity && (
              <input
                type="text"
                placeholder="input quantity"
                onBlur={(e) => {
                  this.handleInputQuantity(e);
                }}
              />
            )}
            {!this.state.inputQuantity && (
              <input
                onClick={() =>
                  this.state.userid
                    ? this.setState({ inputQuantity: true })
                    : (window.location = "./login")
                }
                type="button"
                value="add to cart"
              />
            )}
            <input
              type="text"
              placeholder="Comment"
              value={this.state.commentInput}
              onChange={this.handleGetComment}
            />
            <select
              value={this.state.ratingInput}
              onChange={this.handleGetRating}
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
            <input type="button" onClick={this.addReview} value="add review" />
          </div>
        </div>
        <button onClick={this.getallreview}>all review</button>
      </div>
    );
  }
}

export default Info;
