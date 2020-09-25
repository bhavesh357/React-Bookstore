import React, { useState, useEffect } from "react";
import CustomerCart from "../CustomerCart";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { add } from "lodash";
import validation from "./../../Service/validation";
import Navbar from "../Navbar";
import firebaseCalls from "./../../Service/firebase";

let Validate = new validation();

export default function Cart() {
  const [bookList, setBookList] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [type, setType] = useState("Home");

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [isPincodeInvalid, setIsPincodeInvalid] = useState(false);
  const [isLocalityInvalid, setIsLocalityInvalid] = useState(false);
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [isCityInvalid, setIsCityInvalid] = useState(false);
  const [isLandmarkInvalid, setIsLandmarkInvalid] = useState(false);

  let patterns = Validate.getRegexs();

  const changeValue = (e, setter, validateSetter, pattern) => {
    setter(e.target.value);
    validateSetter(Validate.validateInput(e.target.value, pattern));
  };

  useEffect(() => {
    firebaseCalls.getBookListWithDetails().then((res) => {
      console.log(res);
      setBookList(res);
    });
  }, []);

  const reloadCart = () => {
    firebaseCalls.getBookListWithDetails().then((res) => {
      console.log(res);
      setBookList(res);
    });
  };

  return (
    <div className="dashboard">
      <Navbar
        bookCount={0}
        handleSearch={() => {
          console.log("cart");
        }}
      />
      <Grid container className="cart-details">
        <Grid item md={10}>
          <Grid item md={10}>
            <CustomerCart
              reloadCart={reloadCart}
              books={bookList}
            ></CustomerCart>
            <div className="cart-box">
              <Typography variant="h5">Customer Details</Typography>
              <Grid container>
                <Grid container spacing={0} item md={8} className="cart-form">
                  <FormControl className="cart-input-col">
                    <TextField
                      error={isNameInvalid}
                      onChange={(e) => {
                        changeValue(
                          e,
                          setName,
                          setIsNameInvalid,
                          patterns.fullName
                        );
                      }}
                      className="cart-input"
                      size="small"
                      name="name"
                      value={name}
                      variant="outlined"
                      label="Full Name"
                    />
                  </FormControl>
                  <FormControl className="cart-input-col">
                    <TextField
                      error={isPhoneInvalid}
                      onChange={(e) => {
                        changeValue(
                          e,
                          setPhone,
                          setIsPhoneInvalid,
                          patterns.phoneNumber
                        );
                      }}
                      className="cart-input"
                      size="small"
                      name="phone"
                      value={phone}
                      type="number"
                      variant="outlined"
                      label="Phone Number"
                    />
                  </FormControl>
                  <FormControl className="cart-input-col">
                    <TextField
                      error={isPincodeInvalid}
                      onChange={(e) => {
                        changeValue(
                          e,
                          setPincode,
                          setIsPincodeInvalid,
                          patterns.pincode
                        );
                      }}
                      className="cart-input"
                      size="small"
                      name="pincode"
                      value={pincode}
                      type="number"
                      variant="outlined"
                      label="Pincode"
                    />
                  </FormControl>
                  <FormControl className="cart-input-col">
                    <TextField
                      error={isLocalityInvalid}
                      onChange={(e) => {
                        changeValue(
                          e,
                          setLocality,
                          setIsLocalityInvalid,
                          patterns.address
                        );
                      }}
                      className="cart-input"
                      size="small"
                      name="locality"
                      value={locality}
                      variant="outlined"
                      label="Locality"
                    />
                  </FormControl>
                  <FormControl fullWidth className="cart-input-col">
                    <TextField
                      error={isAddressInvalid}
                      onChange={(e) => {
                        changeValue(
                          e,
                          setAddress,
                          setIsAddressInvalid,
                          patterns.address
                        );
                      }}
                      multiline
                      rows={3}
                      className="cart-input"
                      size="small"
                      value={address}
                      name="address"
                      variant="outlined"
                      label="Address"
                    />
                  </FormControl>
                  <FormControl className="cart-input-col">
                    <TextField
                      error={isCityInvalid}
                      onChange={(e) => {
                        changeValue(
                          e,
                          setCity,
                          setIsCityInvalid,
                          patterns.city
                        );
                      }}
                      className="cart-input"
                      name="city"
                      value={city}
                      size="small"
                      variant="outlined"
                      label="City"
                    />
                  </FormControl>
                  <FormControl className="cart-input-col">
                    <TextField
                      error={isLandmarkInvalid}
                      onChange={(e) => {
                        changeValue(
                          e,
                          setLandmark,
                          setIsLandmarkInvalid,
                          patterns.address
                        );
                      }}
                      className="cart-input"
                      name="landmark"
                      size="small"
                      value={landmark}
                      variant="outlined"
                      label="Landmark"
                    />
                  </FormControl>
                  <FormControl fullWidth className="cart-input-col">
                    <FormLabel className="cart-input" component="legend">
                      Type
                    </FormLabel>
                    <RadioGroup
                      aria-label="type"
                      name="type"
                      className="cart-radio"
                      dir="row"
                      value={type}
                      onChange={(e) => {
                        changeValue(e, setType);
                      }}
                    >
                      <FormControlLabel
                        value="Home"
                        control={<Radio />}
                        label="Home"
                      />
                      <FormControlLabel
                        value="Work"
                        control={<Radio />}
                        label="Work"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
