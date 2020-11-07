import React from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
import { InputWithText } from '../../App/components/ComponentModule'
import Aux from "../../hoc/_Aux";
import TableData from '../../App/components/Tables/TablesComp';
import './BrandsStyle.scss';
import i18n from '../../i18n';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { displayToast } from '../../globals/globals';
import { StoreBrands } from '../../store/actions/BrandsAction';


class Brands extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Brands: null,
            showAdd: false,
            showEdit: false,
            showDetails: false,
            selectedBrand: null,
            selectedIntervals: null,
            selectedBrandIndex: null,
            newBrand: {},
        }
    }

    intervals = [
        { id: "1", name: "3" },
        { id: "2", name: "6" },
        { id: "3", name: "9" },
        { id: "4", name: "12" },
    ]

    headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
        { id: 'address', numeric: false, disablePadding: true, label: 'Address' },
        { id: 'contact', numeric: false, disablePadding: true, label: 'Contact' },
    ];


    DataShowPerTable = ["name", "email", "address", "contact"];

    async componentDidMount() {
        const { Brands } = this.props;
        if (Brands) {
            let result = await Brands.filter((Item) => {
                return Item.isDeleted == false;
            })

            this.setState({ Brands: result });
            setTimeout(
                () => this.setState({ Brands: result }),
                10
            );
        }

    }


    async changeAddInput(Input, val) {
        switch (Input) {
            case 'name':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        name: val
                    }
                })
                break;
            case 'email':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        email: val
                    }
                })
                break;
            case 'contact':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        contact: val
                    }
                })
                break;
            case 'contactPerson':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        contactPerson: val
                    }
                })
                break;
            case 'address':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        address: val
                    }
                })
                break;
            case 'regID':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        regID: val
                    }
                })
                break;
            case 'taxID':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        taxID: val
                    }
                })
                break;
            case 'smtpIntegration':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        smtpIntegration: val
                    }
                })
                break;
            case 'smsApiKey':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        smsApiKey: val
                    }
                })
                break;
            case 'senderID':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        senderID: val
                    }
                })
                break;
            case 'sendName':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        sendName: val
                    }
                })
                break;
            case 'password':
                await this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        password: val
                    }
                })
                break;
        }
    }

    async changeEditInput(Input, val) {
        switch (Input) {
            case 'name':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        name: val
                    }
                })
                break;
            case 'email':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        email: val
                    }
                })
                break;
            case 'contact':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        contact: val
                    }
                })
                break;
            case 'contactPerson':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        contactPerson: val
                    }
                })
                break;
            case 'address':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        address: val
                    }
                })
                break;
            case 'regID':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        regID: val
                    }
                })
                break;
            case 'taxID':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        taxID: val
                    }
                })
                break;
            case 'smtpIntegration':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        smtpIntegration: val
                    }
                })
                break;
            case 'smsApiKey':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        smsApiKey: val
                    }
                })
                break;
            case 'senderID':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        senderID: val
                    }
                })
                break;
            case 'sendName':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        sendName: val
                    }
                })
                break;
            case 'password':
                await this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        password: val
                    }
                })
                break;
        }
    }

    delete(Item, key) {
        const { Brands } = this.state;
        const { StoreBrands } = this.props;
        HtttpDeleteDefult("brand/" + Item.id + "").then((res) => {
            if (res) {
                Brands.splice(key, 1);
                this.setState({ Brands: Brands })
                StoreBrands(Brands)
                displayToast('brand is deleted succefully', true);

            }
        })
    }


    Details(item) {
        this.setState({ selectedBrand: item, showDetails: true })

    }

    Edit(item, index) {
        this.setState({ selectedBrand: item, selectedBrandIndex: index, showEdit: true });
    }

    Add() {
        this.setState({ showAdd: true, newBrand: {}, });
    }

    AddForm() {
        const { showAdd, newBrand } = this.state;
        const { name, email, contact, contactPerson, address, regID, taxID, smtpIntegration, smsApiKey, senderID, sendName, password } = newBrand

        const handleClose = () => this.setState({ showAdd: false });
        return (
            <>
                <Modal show={showAdd} onHide={handleClose} dialogClassName="modal-80w"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Brand</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("Branches.NamePlacholder")} value={name} onChange={(val) => { this.changeAddInput('name', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Email"} placeholder={"Enter Email"} value={email} onChange={(val) => { this.changeAddInput('email', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Contact"} placeholder={"Enter contact"} value={contact} onChange={(val) => { this.changeAddInput('contact', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Contact Person"} placeholder={"Enter Contact Person"} value={contactPerson} onChange={(val) => { this.changeAddInput('contactPerson', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Address"} placeholder={"Enter Address"} value={address} onChange={(val) => { this.changeAddInput('address', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="password" label={"Password"} placeholder={"Enter Password"} value={password} onChange={(val) => { this.changeAddInput('password', val) }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Tax ID"} placeholder={"Enter Tax ID"} value={taxID} onChange={(val) => { this.changeAddInput('taxID', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"SMTP Integration"} placeholder={"Enter SMTP Integration"} value={smtpIntegration} onChange={(val) => { this.changeAddInput('smtpIntegration', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"SMS Api Key"} placeholder={"Enter SMS Api Key "} value={smsApiKey} onChange={(val) => { this.changeAddInput('smsApiKey', val) }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Sender ID"} placeholder={"Enter Sender ID"} value={senderID} onChange={(val) => { this.changeAddInput('senderID', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Send Name"} placeholder={"Enter Send Name "} value={sendName} onChange={(val) => { this.changeAddInput('sendName', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Reg ID"} placeholder={"Enter Reg ID"} value={regID} onChange={(val) => { this.changeAddInput('regID', val) }} />
                                    </Col>

                                </Row>
                            </Form>
                        </CardBody>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={() => this.AddBrand()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    selectedInterval(val) {
        this.setState({ selectedIntervals: val });
    }


    EditForm() {
        const { showEdit, selectedBrand } = this.state;
        const { name, email, contact, contactPerson, address, regID, taxID, smtpIntegration, smsApiKey, senderID, sendName, password } = selectedBrand

        const handleClose = () => this.setState({ showEdit: false });
        return (
            <>
                <Modal show={showEdit} onHide={handleClose} dialogClassName="modal-70w">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Brand</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("Branches.NamePlacholder")} value={name} onChange={(val) => { this.changeEditInput('name', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Email"} placeholder={"Enter Email"} value={email} onChange={(val) => { this.changeEditInput('email', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Contact"} placeholder={"Enter contact"} value={contact} onChange={(val) => { this.changeEditInput('contact', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Contact Person"} placeholder={"Enter Contact Person"} value={contactPerson} onChange={(val) => { this.changeEditInput('contactPerson', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Address"} placeholder={"Enter Address"} value={address} onChange={(val) => { this.changeEditInput('address', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="password" label={"Password"} placeholder={"Enter Password"} value={password} onChange={(val) => { this.changeEditInput('password', val) }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Tax ID"} placeholder={"Enter Tax ID"} value={taxID} onChange={(val) => { this.changeEditInput('taxID', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"SMTP Integration"} placeholder={"Enter SMTP Integration"} value={smtpIntegration} onChange={(val) => { this.changeEditInput('smtpIntegration', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"SMS Api Key"} placeholder={"Enter SMS Api Key "} value={smsApiKey} onChange={(val) => { this.changeEditInput('smsApiKey', val) }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Sender ID"} placeholder={"Enter Sender ID"} value={senderID} onChange={(val) => { this.changeEditInput('senderID', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Send Name"} placeholder={"Enter Send Name "} value={sendName} onChange={(val) => { this.changeEditInput('sendName', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Reg ID"} placeholder={"Enter Reg ID"} value={regID} onChange={(val) => { this.changeEditInput('regID', val) }} />
                                    </Col>

                                </Row>
                            </Form>
                        </CardBody>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={() => this.EditBrand()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    DetailsForm() {
        const { showDetails, selectedBrand } = this.state;
        const { name, email, contact, contactPerson, address, regID, taxID, smtpIntegration, smsApiKey, senderID, sendName } = selectedBrand
        const handleClose = () => this.setState({ showDetails: false });
        return (
            <>
                <Modal show={showDetails} onHide={handleClose} dialogClassName="modal-70w BranchesDetails">
                    <Modal.Header closeButton>
                        <Modal.Title>Branch Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Name:</label>
                                            <label className="subTitle">{name ? name : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Email:</label>
                                            <label className="subTitle">{email ? email : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Contact:</label>
                                            <label className="subTitle">{contact ? contact : "No value"}</label>
                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Contact Person:</label>
                                            <label className="subTitle">{contactPerson ? contactPerson : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Address:</label>
                                            <label className="subTitle">{address ? address : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Reg ID:</label>
                                            <label className="subTitle">{regID ? regID : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Tax ID:</label>
                                            <label className="subTitle">{taxID ? taxID : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">SMTP Integration:</label>
                                            <label className="subTitle">{smtpIntegration ? smtpIntegration : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Sender ID:</label>
                                            <label className="subTitle">{senderID ? senderID : "No value"}</label>
                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Send Name:</label>
                                            <label className="subTitle">{sendName ? sendName : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">SMS Api Key:</label>
                                            <label className="subTitle">{smsApiKey ? smsApiKey : "No value"}</label>
                                        </div>
                                    </Col>

                                </Row>
                            </Form>
                        </CardBody>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    EditBrand() {
        const { selectedBrand, selectedBrandIndex, Brands } = this.state;
        const { StoreBrands } = this.props;

        this.setState({ showEdit: false });
        HtttpPutDefult("brand/" + selectedBrand.id + "", selectedBrand).then((res) => {
            if (res) {
                Brands[selectedBrandIndex] = selectedBrand;
                this.setState({ Brands: Brands });
                StoreBrands(Brands)
                displayToast('Brand is updated succefully', true);
            }
        })
    }

    AddBrand() {
        const { newBrand, Brands } = this.state;
        const { StoreBrands } = this.props;
        this.setState({ showAdd: false });
        newBrand.isActive = true;
        newBrand.isDeleted = false;
        newBrand.logo = "";
        HtttpPostDefult("brand/create", newBrand).then((res) => {
            if (!res.errors) {
                Brands.push(res);
                StoreBrands(Brands);
                this.setState({ Brands: Brands });
                displayToast('Brand data is added succefully', true);
            }
            else {
                displayToast('Brand data is not added succefully', false);
            }
        })
    }

    ActiveBranch(selectedBrand) {
        const { selectedBrandIndex, Brands } = this.state;
        const { StoreBrands } = this.props;
        selectedBrand.isActive = true;
        HtttpPutDefult("brand/" + selectedBrand.id + "", selectedBrand).then((res) => {
            if (res) {
                Brands[selectedBrandIndex] = selectedBrand;
                this.setState({ Brands: Brands });
                StoreBrands(Brands)
                displayToast('Brand is updated succefully', true);
            }
        })
    }

    deActiveBranch(selectedBrand) {
        const { selectedBrandIndex, Brands } = this.state;
        const { StoreBrands } = this.props;
        selectedBrand.isActive = false;
        HtttpPutDefult("brand/" + selectedBrand.id + "", selectedBrand).then((res) => {
            if (res) {
                Brands[selectedBrandIndex] = selectedBrand;
                this.setState({ Brands: Brands });
                StoreBrands(Brands)
                displayToast('Brand is updated succefully', true);
            }
        })
    }

    render() {
        const { Brands, showAdd, showDetails, showEdit } = this.state;
        return (
            <Aux>
                <div className="Brands">
                    {showAdd && this.AddForm()}
                    {showEdit && this.EditForm()}
                    {showDetails && this.DetailsForm()}
                    <Row>
                        <Col md="12">
                            {
                                Brands && Brands.length > 0 ?
                                    <TableData
                                        headCells={this.headCells}
                                        data={Brands}
                                        DataShowPerTable={this.DataShowPerTable}
                                        handleDelete={(val, index) => { this.delete(val, index) }}
                                        handleDetails={(val, index) => { this.Details(val, index) }}
                                        handleEdit={(val, index) => { this.Edit(val, index) }}
                                        totalPages={1}
                                        Title={"Brands"}
                                        handleAdd={() => { this.Add() }}
                                        ActiveAction={(val, index) => { this.ActiveBranch(val, index) }}
                                        deActiveAction={(val, index) => { this.deActiveBranch(val, index) }}

                                    />
                                    :
                                    <p className="noResult">No Brands Found</p>

                            }

                        </Col>
                    </Row>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Brands: state.BrandsState.Brands,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        StoreBrands: (val) => dispatch(StoreBrands(val)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Brands);

