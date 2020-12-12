import React from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { InputWithText, DropDown } from '../../App/components/ComponentModule'
import Aux from "../../hoc/_Aux";
import TableData from '../../App/components/Tables/TablesComp';
import './BrandsStyle.scss';
import i18n from '../../i18n';
import { HtttpGetDefult, HtttpPostDefult, HtttpPutDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { displayToast } from '../../globals/globals';
import { StoreBrands } from '../../store/actions/BrandsAction';
import DatePicker from "react-datepicker";
import moment from 'moment'
import {
    CardBody,
    FormGroup
} from 'reactstrap';
import { PhotoshopPicker } from 'react-color';


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
                },
                displayColor: '#22194D'
            },
            btnDisable: true,
            EditArr: [],
            btnDisableAdd: true,
            AddArr: [],
            showPay: false,
            newPay: [],
            AddPay: [],
            selectedBranch: null,
            PayBtnDisable: true,
            displayColorPicker: false


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
        const { StoreBrands } = this.props;
        let Result;
        await HtttpGetDefult('brand/list', true).then((res) => {
            if (res) {
                Result = res;
                StoreBrands(res);
            }
        })

        let Brands = await Result.filter((Item) => {
            return Item.isDeleted == false;
        })


        this.setState({ Brands: Brands });
        setTimeout(
            () => this.setState({ Brands: Brands }),
            10
        );
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
            case 'Color':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        displayColor: val
                    }
                })
                break;
            case 'description':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        displayDesc: val
                    }
                })
                break;


            case 'title':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        displayName: val
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
            case 'title':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        displayName: val
                    }
                })
                break;
            case 'description':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        displayDesc: val
                    }
                })
                break;
        }

    }

    handleChangeComplete = (color) => {
        this.setState({
            newBrand: {
                ...this.state.newBrand,
                displayColor: color.hex
            }
        })

        this.checkAddValidation('15', color.hex)
    };

    handleChangeCompleteEdit = (color) => {
        this.setState({
            selectedBrand: {
                ...this.state.selectedBrand,
                displayColor: color.hex
            }
        })

    };



    handleClosePicker(type) {
        this.setState({ displayColorPicker: false })
    }


    async changeAddInputPay(Input, val) {
        switch (Input) {
            case 'amount':
                this.setState({
                    newPay: {
                        ...this.state.newPay,
                        amount: val
                    }
                })
                break;
            case 'Date':
                this.checkAddPayValidation('1', val ? true : false)
                this.setState({
                    newPay: {
                        ...this.state.newPay,
                        Date: val
                    }
                })
                break;
        }
    }

    delete(Item, key) {
        const { Brands } = this.state;
        const { StoreBrands } = this.props;
        Brands[key].isDeleted = true;
        HtttpPutDefult("brand/" + Item._id + "", Brands[key], true).then((res) => {
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

    Pay(Item) {
        HtttpGetDefult('brand/' + Item._id + '').then(async (res) => {
            await this.setState({ Branches: res.branches, showPay: true })
            setTimeout(
                () => this.setState({ Branches: res.branches, showPay: true }),
                10
            );
        })
    }

    AddForm() {
        const { showAdd, newBrand, btnDisableAdd } = this.state;
        const { name, email, contact, contactPerson, address, regID, taxID, smtpIntegration, smsApiKey, senderID, sendName, password, displayName, displayDesc, displayColor } = newBrand;
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
                                        <InputWithText type="text" label={"Registration ID"} placeholder={"Enter Registration ID"} onChange={(val) => this.changeAddInput("regID", val)} value={regID} isRequired validation="number" onBlur={(val) => { this.checkAddValidation('5', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Tax ID"} placeholder={"Enter Tax ID"} onChange={(val) => this.changeAddInput("taxID", val)} value={taxID} isRequired validation="number" onBlur={(val) => { this.checkAddValidation('6', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Integration Server"} placeholder={"Enter Integration Server"} onChange={(val) => this.changeAddInput("server", val)} value={smtpIntegration.server} isRequired onBlur={(val) => { this.checkAddValidation('7', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Integration Port"} placeholder={"Enter Integration Port"} onChange={(val) => this.changeAddInput("port", val)} value={smtpIntegration.port} isRequired onBlur={(val) => { this.checkAddValidation('8', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Integration User Name"} placeholder={"Enter Integration User Name"} onChange={(val) => this.changeAddInput("username", val)} value={smtpIntegration.username} isRequired onBlur={(val) => { this.checkAddValidation('9', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="password" label={"Integration Password"} placeholder={"Enter Integration Password"} onChange={(val) => this.changeAddInput("passwordSMTP", val)} value={smtpIntegration.password} isRequired validation="password" onBlur={(val) => { this.checkAddValidation('10', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"SMS Api Key"} placeholder={"Enter SMS Api Key"} onChange={(val) => this.changeAddInput("smsApiKey", val)} value={smsApiKey} isRequired onBlur={(val) => { this.checkAddValidation('11', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"SMS Sender ID"} placeholder={"Enter SMS Sender ID"} onChange={(val) => this.changeAddInput("senderID", val)} value={senderID} validation="number" isRequired onBlur={(val) => { this.checkAddValidation('12', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Send Name"} placeholder={"Enter Send Name"} onChange={(val) => this.changeAddInput("sendName", val)} value={sendName} isRequired onBlur={(val) => { this.checkAddValidation('13', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Brand Title"} placeholder={"Enter the brand title"} onChange={(val) => this.changeAddInput("title", val)} value={displayName} isRequired onBlur={(val) => { this.checkAddValidation('16', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Brand Description"} placeholder={"Enter the brand description"} onChange={(val) => this.changeAddInput("description", val)} value={displayDesc} isRequired onBlur={(val) => { this.checkAddValidation('17', val) }} />
                                    </Col>
                                </Row>
                                <Row style={{ display: 'flex', width: '80%', margin: 'auto', marginTop: 20, marginBottom: 20 }}>
                                    <div className="colorSchemaPart1">
                                        <label className="Title">Pick your color schema:</label>
                                        <div className="pickColorOutter" onClick={() => { this.setState({ displayColorPicker: true }) }}>
                                            <div className={"pickColorInner"} style={{ background: displayColor }}></div>
                                        </div>
                                        {
                                            this.state.displayColorPicker &&
                                            <PhotoshopPicker
                                                color={displayColor}
                                                onChangeComplete={this.handleChangeComplete}
                                                onCancel={(color) => this.handleClosePicker(color, 'close')}
                                                onAccept={(color) => this.handleClosePicker(color, 'accept')}
                                            />
                                        }
                                    </div>
                                    <div className="colorSchemaPart2">
                                        <div className="Container">
                                            <Row className="Row" style={{ borderColor: displayColor }}>
                                                <Col md="4" className="Left" style={{ background: displayColor }}>
                                                    <p className="showTitle">{displayName}</p>
                                                    <p className="showDesc">{displayDesc}</p>
                                                </Col>
                                                <Col md="6" className="Right">
                                                    <p className="NumberTxt">Phone</p>
                                                    <div className="Number" style={{ borderColor: displayColor }}></div>
                                                    <Button style={{ background: displayColor }}>Connect</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
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

    checkAddPayValidation(index, val) {
        const { AddPay } = this.state;
        let updatedArr;
        updatedArr = AddPay;
        updatedArr[index] = val;
        this.setState({ AddPay: updatedArr })
        this.checkDisableOrEnableBtnAddPay(2, AddPay);
    }


    checkDisableOrEnableBtnAddPay(num, arr) {
        let result;
        console.log(arr)
        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ PayBtnDisable: true })
            }
            else {
                this.setState({ PayBtnDisable: false })
            }
        }
        else {
            this.setState({ PayBtnDisable: true })
        }
    }

    checkEditValidation(index, val) {
        const { EditArr } = this.state;
        let updatedArr;
        updatedArr = EditArr;
        updatedArr[index] = val;
        this.setState({ EditArr: updatedArr })
        this.checkDisableOrEnableBtnEdit(16, EditArr);

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
        this.checkDisableOrEnableBtnAdd(18, AddArr);

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
        const { name, email, contact, contactPerson, address, regID, taxID, smtpIntegration, smsApiKey, senderID, sendName, password, displayColor, displayName, displayDesc } = selectedBrand

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
                                        <InputWithText type="text" label={"Registration ID"} placeholder={"Enter Registration ID"} onChange={(val) => this.changeEditInput("regID", val)} value={regID} isRequired validation="number" onBlur={(val) => { this.checkEditValidation('5', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Tax ID"} placeholder={"Enter Tax ID"} onChange={(val) => this.changeEditInput("taxID", val)} value={taxID} isRequired validation="number" onBlur={(val) => { this.checkEditValidation('6', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Integration Server"} placeholder={"Enter Integration Server"} onChange={(val) => this.changeEditInput("server", val)} value={smtpIntegration.server} isRequired onBlur={(val) => { this.checkEditValidation('7', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Integration Port"} placeholder={"Enter Integration Port"} onChange={(val) => this.changeEditInput("port", val)} value={smtpIntegration.port} isRequired onBlur={(val) => { this.checkEditValidation('8', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Integration User Name"} placeholder={"Enter Integration User Name"} onChange={(val) => this.changeEditInput("username", val)} value={smtpIntegration.username} isRequired onBlur={(val) => { this.checkEditValidation('9', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="password" label={"Integration Password"} placeholder={"Enter Integration Password"} onChange={(val) => this.changeEditInput("passwordSMTP", val)} value={smtpIntegration.password} isRequired validation="password" onBlur={(val) => { this.checkEditValidation('10', val) }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"SMS Api Key"} placeholder={"Enter SMS Api Key"} onChange={(val) => this.changeEditInput("smsApiKey", val)} value={smsApiKey} isRequired onBlur={(val) => { this.checkEditValidation('11', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Sender ID"} placeholder={"Enter SMS Sender ID"} onChange={(val) => this.changeEditInput("senderID", val)} value={senderID} validation="number" isRequired onBlur={(val) => { this.checkEditValidation('12', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Send Name"} placeholder={"Enter Send Name"} onChange={(val) => this.changeEditInput("sendName", val)} value={sendName} isRequired onBlur={(val) => { this.checkEditValidation('13', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Brand Title"} placeholder={"Enter the brand title"} onChange={(val) => this.changeEditInput("title", val)} value={displayName} isRequired onBlur={(val) => { this.checkEditValidation('14', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Brand Description"} placeholder={"Enter the brand description"} onChange={(val) => this.changeEditInput("description", val)} value={displayDesc} isRequired onBlur={(val) => { this.checkEditValidation('15', val) }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 20, display: 'flex', width: '80%', margin: 'auto', marginTop: 20, marginBottom: 20 }}>
                                    <div className="colorSchemaPart1">
                                        <label className="Title">Pick your color schema:</label>
                                        <div className="pickColorOutter" onClick={() => { this.setState({ displayColorPicker: true }) }}>
                                            <div className={"pickColorInner"} style={{ background: displayColor }}></div>
                                        </div>
                                        {
                                            this.state.displayColorPicker &&
                                            <PhotoshopPicker
                                                color={displayColor}
                                                onChangeComplete={this.handleChangeCompleteEdit}
                                                onCancel={(color) => this.handleClosePicker(color, 'close')}
                                                onAccept={(color) => this.handleClosePicker(color, 'accept')}
                                            />
                                        }
                                    </div>
                                    <div className="colorSchemaPart2">
                                        <div className="Container">
                                            <Row className="Row" style={{ borderColor: displayColor }}>
                                                <Col md="4" className="Left" style={{ background: displayColor }}>
                                                    <p className="showTitle">{displayName}</p>
                                                    <p className="showDesc">{displayDesc}</p>
                                                </Col>
                                                <Col md="6" className="Right">
                                                    <p className="NumberTxt">Phone</p>
                                                    <div className="Number" style={{ borderColor: displayColor }}></div>
                                                    <Button style={{ background: displayColor }}>Connect</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Row>

                            </Form>

                        </CardBody>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnDisable} onClick={() => this.EditBrand()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    DetailsForm() {
        const { showDetails, selectedBrand } = this.state;
        const { name, email, contact, contactPerson, address, regID, taxID, smtpIntegration, smsApiKey, senderID, sendName, smsCount, emailCount, notificationCount, displayColor, displayDesc, displayName } = selectedBrand

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
                                        <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>INTEGRATION</h3>
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
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">SMS Sender ID:</label>
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

                                <Row>
                                    <Col>
                                        <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>COMMERCIAL</h3>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Registration ID:</label>
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
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Push Notification Count:</label>
                                            <label className="subTitle">{notificationCount}</label>
                                        </div>
                                    </Col>

                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Email Count:</label>
                                            <label className="subTitle">{emailCount}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">SMS Count:</label>
                                            <label className="subTitle">{smsCount}</label>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>LANDING PAGE CONFIGURATIONS:</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Title:</label>
                                            <label className="subTitle">{displayName}</label>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Color Schema:</label>
                                            <div className="pickColorOutter">
                                                <div className={"pickColorInner"} style={{ background: displayColor }}></div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12" style={{ whiteSpace: 'none' }}>
                                        <div className="detailsContainer">
                                            <label className="Title">Description:</label>
                                            <label className="subTitle">{displayDesc}</label>
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
        let res = selectedBrand;
        HtttpPutDefult('brand/' + selectedBrand._id + '', res, true).then((res) => {
            if (res) {
                Brands[selectedBrandIndex] = selectedBrand;
                this.setState({ Brands: Brands, editMode: false });
                StoreBrands(Brands);
                displayToast('Brand data is updated successfully', true);
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
        HtttpPostDefult("brand/create", newBrand, true).then((res) => {
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
        HtttpPutDefult("brand/" + selectedBrand._id + "", selectedBrand, true).then((res) => {
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
        HtttpPutDefult("brand/" + selectedBrand._id + "", selectedBrand, true).then((res) => {
            if (res) {
                Brands[selectedBrandIndex] = selectedBrand;
                this.setState({ Brands: Brands });
                StoreBrands(Brands)
                displayToast('Brand is deactivated successfully', true);
            }
        })
    }

    selectedBranch(val) {
        this.setState({ selectedBranch: val });
    }

    submitPay() {
        this.setState({ showPay: false, newPay: [], PayBtnDisable: true })
        displayToast('Payment processed successfully done', false);

    }

    AddPayForm() {
        const { showPay, selectedBranch, PayBtnDisable, newPay, Branches, AddPay } = this.state;
        const { amount, Date } = newPay;
        const handleClose = () => this.setState({ showPay: false, newPay: [], PayBtnDisable: true });
        return (
            <>
                <Modal show={showPay} onHide={handleClose} dialogClassName="modal-80w">
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Amount"} placeholder={"Enter the amount"} value={amount} isRequired validation="number" onChange={(val) => this.changeAddInputPay("amount", val)} onBlur={(val) => { this.checkAddPayValidation('0', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <label className="Title">Pay Date:</label>
                                        <div>
                                            <DatePicker className="DatePicker" selected={Date ? moment(Date).toDate() : null} onChange={date => this.changeAddInputPay('Date', moment(date).format('DD-MMM-YYYY'))} onBlur={(val) => { this.checkAddPayValidation('1', val.target.value ? true : false) }} />
                                            <i class="fas fa-calendar-alt"></i>
                                            {!AddPay[1] && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>This field is required</label>}
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Branches</label>
                                            <DropDown label={"Branches"} items={Branches} onClick={(val) => { this.selectedBranch(val) }} selctedItem={selectedBranch} />
                                            {!selectedBranch && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>This field is required</label>}
                                        </FormGroup>
                                    </Col>

                                </Row>
                            </Form>

                        </CardBody>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={PayBtnDisable} onClick={() => this.submitPay()}>Pay</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );

    }

    render() {
        const { Brands, showAdd, showDetails, showEdit, showPay } = this.state;
        return (
            <Aux>
                <div className="Brands">
                    {showAdd && this.AddForm()}
                    {showEdit && this.EditForm()}
                    {showDetails && this.DetailsForm()}
                    {showPay && this.AddPayForm()}
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
                                addMSG={"add new brand"}
                                handlePay={(val, index) => { this.Pay(val, index) }}
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

