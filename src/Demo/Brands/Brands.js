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
            selectedBrandIndex: null,
            newBrand: {
                smtpIntegration: {
                    server: "",
                    port: "",
                    username: "",
                    password: ""
                }
            },
            btnDisable: true,
            EditArr: [],
            btnDisableAdd: true,
            AddArr: []

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
        const { smtpIntegration } = this.state.newBrand;

        switch (Input) {
            case 'name':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        name: val
                    }
                })
                break;
            case 'password':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        password: val
                    }
                })
                break;
            case 'address':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        address: val
                    }
                })
                break;
            case 'contact':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        contact: val
                    }
                })
                break;
            case 'contactPersonal':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        contactPerson: val
                    }
                })
                break;
            case 'regID':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        regID: val
                    }
                })
                break;
            case 'taxID':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        taxID: val
                    }
                })
                break;
            case 'server':
                smtpIntegration.server = val;
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'port':
                smtpIntegration.port = val;
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'username':
                smtpIntegration.username = val;
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'passwordSMTP':
                smtpIntegration.password = val;
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'sendName':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        sendName: val
                    }
                })
                break;
            case 'senderID':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        senderID: val
                    }
                })
                break;
            case 'smsApiKey':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        smsApiKey: val
                    }
                })
                break;
            case 'email':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        email: val
                    }
                })
                break;
        }

    }


    async changeEditInput(Input, val) {
        const { smtpIntegration } = this.state.selectedBrand;

        switch (Input) {
            case 'password':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        password: val
                    }
                })
                break;
            case 'address':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        address: val
                    }
                })
                break;
            case 'contact':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        contact: val
                    }
                })
                break;
            case 'contactPersonal':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        contactPerson: val
                    }
                })
                break;
            case 'regID':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        regID: val
                    }
                })
                break;
            case 'taxID':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        taxID: val
                    }
                })
                break;
            case 'server':
                smtpIntegration.server = val;
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'port':
                smtpIntegration.port = val;
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'username':
                smtpIntegration.username = val;
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'passwordSMTP':
                smtpIntegration.password = val;
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'sendName':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        sendName: val
                    }
                })
                break;
            case 'senderID':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        senderID: val
                    }
                })
                break;
            case 'smsApiKey':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        smsApiKey: val
                    }
                })
                break;
            case 'name':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        name: val
                    }
                })
                break;
            case 'email':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        email: val
                    }
                })
                break;
        }

    }

    delete(Item, key) {
        const { Brands } = this.state;
        const { StoreBrands } = this.props;
        Brands[key].isDeleted = true;
        HtttpPutDefult("brand/" + Item._id + "", Brands[key]).then((res) => {
            if (res) {
                Brands.splice(key, 1);
                this.setState({ Brands: Brands })
                StoreBrands(Brands)
                displayToast('Brand is deleted successfully', true);

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
        this.setState({
            showAdd: true, newBrand: {
                smtpIntegration: {
                    server: "",
                    port: "",
                    username: "",
                    password: ""
                }
            }
        });
    }

    AddForm() {
        const { showAdd, newBrand, btnDisableAdd } = this.state;
        const { name, email, contact, contactPerson, address, regID, taxID, smtpIntegration, smsApiKey, senderID, sendName, password } = newBrand;
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
                                    {/* <Col md={12}>
                                                            <FormGroup className="profilePicContainer">
                                                                <label>{i18n.t("CompanyProfile.Logo")}</label>
                                                                <Input ref="file" type="file" name="file" onChange={this.changePhoto.bind(this)} />
                                                                <img alt="" src={profilePic} />
                                                            </FormGroup>
                                                        </Col> */}
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("CompanyProfile.NamePlacholder")} value={name} isRequired onChange={(val) => this.changeAddInput("name", val)} onBlur={(val) => { this.checkAddValidation('14', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Email")} placeholder={i18n.t("CompanyProfile.EmailPlacholder")} isRequired onChange={(val) => this.changeAddInput("email", val)} validation="email" onBlur={(val) => { this.checkAddValidation('0', val) }} value={email} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="password" label={i18n.t("CompanyProfile.Password")} placeholder={"********"} onChange={(val) => this.changeAddInput("password", val)} value={password} validation="password" isRequired onBlur={(val) => { this.checkAddValidation('1', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Address")} placeholder={i18n.t("CompanyProfile.AddressPlacholder")} onChange={(val) => this.changeAddInput("address", val)} value={address} isRequired onBlur={(val) => { this.checkAddValidation('2', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Contact")} placeholder={"01222****"} onChange={(val) => this.changeAddInput("contact", val)} value={contact} validation="phone" isRequired onBlur={(val) => { this.checkAddValidation('3', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.ContactPersonal")} placeholder={"01222****"} onChange={(val) => this.changeAddInput("contactPersonal", val)} value={contactPerson} validation="phone" isRequired onBlur={(val) => { this.checkAddValidation('4', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Register ID"} placeholder={"Enter Register ID"} onChange={(val) => this.changeAddInput("regID", val)} value={regID} isRequired validation="number" onBlur={(val) => { this.checkAddValidation('5', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Tax ID"} placeholder={"Enter Tax ID"} onChange={(val) => this.changeAddInput("taxID", val)} value={taxID} isRequired validation="number" onBlur={(val) => { this.checkAddValidation('6', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMTP Integration Server"} placeholder={"Enter SMTP Integration Server"} onChange={(val) => this.changeAddInput("server", val)} value={smtpIntegration.server} isRequired onBlur={(val) => { this.checkAddValidation('7', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMTP Integration Port"} placeholder={"Enter SMTP Integration Port"} onChange={(val) => this.changeAddInput("port", val)} value={smtpIntegration.port} isRequired onBlur={(val) => { this.checkAddValidation('8', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMTP Integration User Name"} placeholder={"Enter SMTP Integration User Name"} onChange={(val) => this.changeAddInput("username", val)} value={smtpIntegration.username} isRequired onBlur={(val) => { this.checkAddValidation('9', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="password" label={"SMTP Integration Password"} placeholder={"Enter SMTP Integration Password"} onChange={(val) => this.changeAddInput("passwordSMTP", val)} value={smtpIntegration.password} isRequired validation="password" onBlur={(val) => { this.checkAddValidation('10', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMS Api Key"} placeholder={"Enter SMS Api Key"} onChange={(val) => this.changeAddInput("smsApiKey", val)} value={smsApiKey} isRequired onBlur={(val) => { this.checkAddValidation('11', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Sender ID"} placeholder={"Enter Sender ID"} onChange={(val) => this.changeAddInput("senderID", val)} value={senderID} validation="number" isRequired onBlur={(val) => { this.checkAddValidation('12', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Send Name"} placeholder={"Enter Send Name"} onChange={(val) => this.changeAddInput("sendName", val)} value={sendName} isRequired onBlur={(val) => { this.checkAddValidation('13', val) }} />
                                    </Col>
                                </Row>
                            </Form>

                        </CardBody>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnDisableAdd} onClick={() => this.AddBrand()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    checkEditValidation(index, val) {
        const { OwnerProfile } = this.props;

        const { EditArr } = this.state;
        let updatedArr;
        updatedArr = EditArr;
        updatedArr[index] = val;
        this.setState({ EditArr: updatedArr })
        this.checkDisableOrEnableBtnEdit(14, EditArr);

    }


    checkDisableOrEnableBtnEdit(num, arr) {
        let result;

        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ btnDisable: true })
            }
            else {
                this.setState({ btnDisable: false })
            }
        }
        else {
            this.setState({ btnDisable: true })
        }
    }


    checkAddValidation(index, val) {

        const { AddArr } = this.state;
        let updatedArr;
        updatedArr = AddArr;
        updatedArr[index] = val;
        this.setState({ AddArr: updatedArr })
        this.checkDisableOrEnableBtnAdd(15, AddArr);

    }


    checkDisableOrEnableBtnAdd(num, arr) {
        let result;
        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ btnDisableAdd: true })
            }
            else {
                this.setState({ btnDisableAdd: false })
            }
        }
        else {
            this.setState({ btnDisableAdd: true })
        }
    }


    EditForm() {
        const { showEdit, selectedBrand, btnDisable } = this.state;
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
                                    {/* <Col md={12}>
                                                            <FormGroup className="profilePicContainer">
                                                                <label>{i18n.t("CompanyProfile.Logo")}</label>
                                                                <Input ref="file" type="file" name="file" onChange={this.changePhoto.bind(this)} />
                                                                <img alt="" src={profilePic} />
                                                            </FormGroup>
                                                        </Col> */}
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("CompanyProfile.NamePlacholder")} value={name} disabled />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Email")} placeholder={i18n.t("CompanyProfile.EmailPlacholder")} isRequired onChange={(val) => this.changeEditInput("email", val)} validation="email" onBlur={(val) => { this.checkEditValidation('0', val) }} value={email} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="password" label={i18n.t("CompanyProfile.Password")} placeholder={"********"} onChange={(val) => this.changeInput("password", val)} value={password} validation="password" isRequired onBlur={(val) => { this.checkEditValidation('1', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Address")} placeholder={i18n.t("CompanyProfile.AddressPlacholder")} onChange={(val) => this.changeEditInput("address", val)} value={address} isRequired onBlur={(val) => { this.checkEditValidation('2', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Contact")} placeholder={"01222****"} onChange={(val) => this.changeEditInput("contact", val)} value={contact} validation="phone" isRequired onBlur={(val) => { this.checkEditValidation('3', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.ContactPersonal")} placeholder={"01222****"} onChange={(val) => this.changeEditInput("contactPersonal", val)} value={contactPerson} validation="phone" isRequired onBlur={(val) => { this.checkEditValidation('4', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Register ID"} placeholder={"Enter Register ID"} onChange={(val) => this.changeEditInput("regID", val)} value={regID} isRequired validation="number" onBlur={(val) => { this.checkEditValidation('5', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Tax ID"} placeholder={"Enter Tax ID"} onChange={(val) => this.changeEditInput("taxID", val)} value={taxID} isRequired validation="number" onBlur={(val) => { this.checkEditValidation('6', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMTP Integration Server"} placeholder={"Enter SMTP Integration Server"} onChange={(val) => this.changeEditInput("server", val)} value={smtpIntegration.server} isRequired onBlur={(val) => { this.checkEditValidation('7', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMTP Integration Port"} placeholder={"Enter SMTP Integration Port"} onChange={(val) => this.changeEditInput("port", val)} value={smtpIntegration.port} isRequired onBlur={(val) => { this.checkEditValidation('8', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMTP Integration User Name"} placeholder={"Enter SMTP Integration User Name"} onChange={(val) => this.changeEditInput("username", val)} value={smtpIntegration.username} isRequired onBlur={(val) => { this.checkEditValidation('9', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="password" label={"SMTP Integration Password"} placeholder={"Enter SMTP Integration Password"} onChange={(val) => this.changeEditInput("passwordSMTP", val)} value={smtpIntegration.password} isRequired validation="password" onBlur={(val) => { this.checkEditValidation('10', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMS Api Key"} placeholder={"Enter SMS Api Key"} onChange={(val) => this.changeEditInput("smsApiKey", val)} value={smsApiKey} isRequired onBlur={(val) => { this.checkEditValidation('11', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Sender ID"} placeholder={"Enter Sender ID"} onChange={(val) => this.changeEditInput("senderID", val)} value={senderID} validation="number" isRequired onBlur={(val) => { this.checkEditValidation('12', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Send Name"} placeholder={"Enter Send Name"} onChange={(val) => this.changeEditInput("sendName", val)} value={sendName} isRequired onBlur={(val) => { this.checkEditValidation('13', val) }} />
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
                        <Modal.Title>Brand Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col>
                                        <h3 style={{ marginBottom: '30px' }}>INFO</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Name:</label>
                                            <label className="subTitle">{name ? name : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">{i18n.t("CompanyProfile.Email")}:</label>
                                            <label className="subTitle">{email ? email : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">{i18n.t("CompanyProfile.Address")}:</label>
                                            <label className="subTitle">{address ? address : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">{i18n.t("CompanyProfile.Contact")}:</label>
                                            <label className="subTitle">{contact ? contact : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">{i18n.t("CompanyProfile.ContactPersonal")}:</label>
                                            <label className="subTitle">{contactPerson ? contactPerson : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>SMTP INTEGRATION</h3>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Server:</label>
                                            <label className="subTitle">{smtpIntegration.server ? smtpIntegration.server : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Port:</label>
                                            <label className="subTitle">{smtpIntegration.port ? smtpIntegration.port : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">User Name:</label>
                                            <label className="subTitle">{smtpIntegration.username ? smtpIntegration.username : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">SMS Api Key:</label>
                                            <label className="subTitle">{smsApiKey ? smsApiKey : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col>
                                        <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>COMMERCIAL</h3>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Register ID:</label>
                                            <label className="subTitle">{regID ? regID : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Tax ID:</label>
                                            <label className="subTitle">{taxID ? taxID : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Sender ID:</label>
                                            <label className="subTitle">{senderID ? senderID : "No value"}</label>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Send Name:</label>
                                            <label className="subTitle">{sendName ? sendName : "No value"}</label>
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
        const { storeProfile } = this.props;
        this.setState({ showEdit: false });
        let res = selectedBrand;
        HtttpPutDefult('brand/' + selectedBrand._id + '', res).then((res) => {
            if (res) {
                Brands[selectedBrandIndex] = selectedBrand;
                this.setState({ Brands: Brands });
                StoreBrands(Brands)
                displayToast('Brand data is updated successfully', true);
                this.setState({ editMode: false })
            }
        })
    }

    AddBrand() {
        const { newBrand, Brands } = this.state;
        const { StoreBrands } = this.props;
        this.setState({ showAdd: false });
        newBrand.isActive = true;
        newBrand.isDeleted = false;
        newBrand.logo = "string";
        newBrand.taxImage = "string";
        newBrand.regImage = "string";
        HtttpPostDefult("brand/create", newBrand).then((res) => {
            if (!res.errors) {
                newBrand._id = res.id;
                Brands.push(newBrand);
                StoreBrands(Brands);
                this.setState({ Brands: Brands });
                displayToast('Brand data is added successfully', true);
            }
            else {
                displayToast('Brand data is not added successfully', false);
            }
        })
    }

    ActiveBranch(selectedBrand) {
        const { selectedBrandIndex, Brands } = this.state;
        const { StoreBrands } = this.props;
        selectedBrand.isActive = true;
        HtttpPutDefult("brand/" + selectedBrand._id + "", selectedBrand).then((res) => {
            if (res) {
                Brands[selectedBrandIndex] = selectedBrand;
                this.setState({ Brands: Brands });
                StoreBrands(Brands)
                displayToast('Brand is activated successfully', true);
            }
        })
    }

    deActiveBranch(selectedBrand) {
        const { selectedBrandIndex, Brands } = this.state;
        const { StoreBrands } = this.props;
        selectedBrand.isActive = false;
        HtttpPutDefult("brand/" + selectedBrand._id + "", selectedBrand).then((res) => {
            if (res) {
                Brands[selectedBrandIndex] = selectedBrand;
                this.setState({ Brands: Brands });
                StoreBrands(Brands)
                displayToast('Brand is deactivated successfully', true);
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
                                showActiveIcon
                                showDelete
                                noResultMSG={"There is no available brands"}
                            />

                        </Col>
                    </Row>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Brands: state.storage.BrandsState.Brands,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        StoreBrands: (val) => dispatch(StoreBrands(val)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Brands);

