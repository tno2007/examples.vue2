<template>
  <FormulateForm v-model="store.formModel" @submit="handleSubmit" ref="formRef">
    <FormulateInput
      type="group"
      :repeatable="true"
      name="partner"
      #default="{ index }"
      add-label="+ Add previous marriage"
    >
      <FormulateInput type="group" name="info">
        <FormulateInput
          type="text"
          name="new_forename"
          label="First name:"
          :validation="[['required']]"
          placeholder="-- Select --"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="new_surname"
          label="Last name:"
          :validation="[['required']]"
          placeholder="-- Select --"
        ></FormulateInput>
        <FormulateInput
          type="radio"
          name="isorhaveothernames"
          label="Have your partner been known by any name or names apart from what is mentioned above?"
          :validation="[['required']]"
          placeholder="-- Select --"
          :options="store.defaultCollections.boolean"
        ></FormulateInput>
        <FormulateInput
          type="textarea"
          name="isorhaveothernames_moredetail"
          label="Have your partner been known by any name or names apart from what is mentioned above?"
          :validation="[['required']]"
          v-if="
            store.formModel.partners[index].new_knownbyothernames ==
            new Boolean('true')
          "
        ></FormulateInput>
        <FormulateInput
          type="yearmonthday"
          name="dateofbirth"
          label="Date of birth:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="villagetownorcity"
          label="Partner’s village, town or city:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="select"
          name="countryofbirth"
          label="Country of birth:"
          :validation="[['required']]"
          :options="store.collections.countries"
        ></FormulateInput>
        <FormulateInput
          type="select"
          name="nationality"
          label="Your partner’s nationality:"
          :validation="[['required']]"
          :options="store.collections.countries"
        ></FormulateInput>
        <FormulateInput
          type="radio"
          name="isnaturalisebritishcitizen"
          label="Is your partner is a naturalised British citizen?"
          :validation="[['required']]"
          placeholder="-- Select --"
          :options="store.defaultCollections.boolean"
          vif="hide if index > 0"
        ></FormulateInput>
        <FormulateInput
          type="yearmonthday"
          name="NaturalisedBritishCitizenDate"
          label="Enter date they were granted this citizenship:"
          :validation="[['required']]"
          v-if="
            store.formModel.partners[index].new_naturalisedbritishcitizen ==
            new Boolean('true')
          "
          vif="hide if index > 0"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="CitizenshipCertificateReferenceNumber"
          label="Their citizenship certificate reference number:"
          :validation="[['required']]"
          v-if="
            store.formModel.partners[index].new_naturalisedbritishcitizen ==
            new Boolean('true')
          "
        ></FormulateInput>
        <h5>Marriage / Civil partnership:</h5>
        <FormulateInput
          type="yearmonthday"
          name="DateOfMarriageCivilPartnership"
          label="Date of marriage/civil partnership:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="PlaceOfMarriageCivilPartnership"
          label="Place of marriage/civil partnership:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="radio"
          name="previouslymarried"
          label="Were you previously married or in a civil partnership?"
          :validation="[['required']]"
          placeholder="-- Select --"
          :options="store.defaultCollections.boolean"
        ></FormulateInput>
      </FormulateInput>
      <FormulateInput type="group" name="address" v-if="index == 0">
        <h5>Partners present address:</h5>
        <FormulateInput
          type="select"
          name="country"
          label="Country:"
          :validation="[['required']]"
          :options="store.collections.countries"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="addressline1"
          label="Address:"
          :validation="[['required']]"
          placeholder="Address line 1"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="addressline2"
          :validation="[['required']]"
          placeholder="Address line 2"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="posttownorcity"
          label="Post town / city:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="stateorprovince"
          label="State / Province:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="postalcode"
          label="Postal code:"
          :validation="[['required']]"
        ></FormulateInput>
      </FormulateInput>
    </FormulateInput>
  </FormulateForm>
</template>
