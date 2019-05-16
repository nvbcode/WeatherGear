import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";

class ModalForm extends React.Component {
  state = {
    modal: true
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} className={this.className}>
          <ModalHeader>Cart</ModalHeader>
          <ModalBody>
            <Table striped>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Production Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.map(row => (
                  <tr key={row._id}>
                    <th>{row.name}</th>
                    <td>{row.description}</td>
                    <td>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.modalToggle}>
              {" "}
              Cancel{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
