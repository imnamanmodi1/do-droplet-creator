import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

class CreateDroplet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      region: "",
      size: "",
      image: "ubuntu-16-04-x64",
      allDroplets: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  notifySuccess = (notificationContent) => {
    toast.success(notificationContent, { className: "green-background" });
  };

  notifyWarning = (notificationContent) => {
    toast.warn(notificationContent, { className: "green-background" });
  };

  handleDropletDataUpdate = () => {
    axios.get("/api/v1/retrieve-all-droplets").then((allDroplets) => {
      console.log(allDroplets, "allDroplets");
      this.setState({ allDroplets: allDroplets.data });
    });
  };

  handleSubmit = () => {
    if (
      this.state.name != "" ||
      this.state.region != "" ||
      this.state.size != ""
    ) {
      axios
        .post("/api/v1/create-droplet", {
          name: this.state.name,
          region: this.state.region,
          size: this.state.size,
          image: this.state.image,
        })
        .then((res) => this.notifySuccess("Droplet Created Successfully"));
      this.handleDropletDataUpdate();
    } else {
      this.notifyWarning(
        "All Fields are required are required fields or something went wrong"
      );
      this.handleDropletDataUpdate();
    }
  };

  componentDidMount() {
    axios.get("/api/v1/retrieve-all-droplets").then((allDroplets) => {
      this.setState({ allDroplets: allDroplets.data });
    });
  }

  render() {
    const { name, region, size, image, allDroplets } = this.state;
    let cardItems = allDroplets.map((singleDroplet) => (
      <div className="all-cat-container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{singleDroplet.name}</p>
            <a
              class="card-header-icon"
              aria-label="more options"
              href={"#" + singleDroplet.id}
              id={singleDroplet._id}
            >
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
                <i class="fas fa-angle-up" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="columns">
            <div class="content column">
              <label class="label">VCPUs</label>
              {singleDroplet.vcpus}
              <br />
              <br />
            </div>
            <div class="content column">
              <label class="label">Memory</label>
              {singleDroplet.memory}
              <br />
              <br />
            </div>
            <div class="content column">
              <label class="label">IP Address</label>
              {singleDroplet.networks.v4[0].ip_address}
              <br />
              <br />
            </div>
            <div class="content column">
              <label class="label">Date</label>
              <time datetime="2016-1-1">
                {singleDroplet.created_at.toString()}
              </time>
              <br />
              <br />
            </div>
          </div>
        </div>
        <div>
          <br />
        </div>
      </div>
    ));

    return (
      <div className="max-width-70">
        {/* name */}
        <label>Droplet Name</label>
        <div className="field">
          <p className="control">
            <input
              className="input"
              name="name"
              type="text"
              value={name}
              placeholder="Droplet Name"
              onChange={this.handleChange}
            />
          </p>
        </div>

        {/* region */}
        <label>Region</label>
        <div className="field">
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="region"
                value="nyc1"
                onChange={this.handleChange}
              />
              NYC 1
            </label>
            <label className="radio">
              <input
                type="radio"
                name="region"
                value="nyc3"
                onChange={this.handleChange}
              />
              NYC 3
            </label>
            <label className="radio">
              <input
                type="radio"
                name="region"
                value="blr1"
                onChange={this.handleChange}
              />
              BLR 1
            </label>
          </div>
        </div>
        {/* size */}
        <label>Droplet Size</label>
        <div className="field">
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="size"
                value="s-1vcpu-1gb"
                onChange={this.handleChange}
              />
              STANDARD: 1VCPU and 1GB Memory
            </label>
            <label className="radio">
              <input
                type="radio"
                name="size"
                value="s-1vcpu-2gb"
                onChange={this.handleChange}
              />
              STANDARD: 1VCPU and 2GB Memory
            </label>
            <label className="radio">
              <input
                type="radio"
                name="size"
                value="s-2vcpu-2gb"
                onChange={this.handleChange}
              />
              STANDARD: 2VCPU and 2GB Memory
            </label>
          </div>
        </div>
        {/* image */}
        <label>Droplet Image</label>
        <div className="field">
          <p className="control">
            <input
              className="input"
              name="image"
              type="text"
              value={image}
              placeholder="Droplet Name"
              disabled
            />
          </p>
        </div>
        {/* Submit */}
        <div className="field">
          <p className="control">
            <button
              className="button is-success"
              onClick={() => this.handleSubmit()}
            >
              Create
            </button>
          </p>
        </div>
        <ToastContainer />
        <h3>All Droplets</h3>
        {cardItems}
      </div>
    );
  }
}

export default CreateDroplet;
