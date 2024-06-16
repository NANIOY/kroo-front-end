<script>
import NormalButton from '../../atoms/buttons/NormalButton.vue';

export default {
  components: {
    NormalButton,
  },
};
</script>

<template>
  <div class="profile-details">
    <section class="section personal-info">
      <h1>Personal Information</h1>
      <div class="info-box">
        <div class="info-row">
          <div class="info-item">
            <strong>Name</strong>
            <p>Lorem Ipsum</p>
          </div>
          <div class="info-item">
            <strong>Email</strong>
            <p>Lorem Ipsum</p>
          </div>
          <div class="info-item">
            <strong>Age</strong>
            <p>Lorem Ipsum</p>
          </div>
        </div>
        <div class="info-row">
          <div class="info-item">
            <strong>Function</strong>
          </div>
          <div class="info-item">
            <strong>Languages</strong>
          </div>
          <div class="info-item">
            <strong>Skills</strong>
          </div>
        </div>
        <div class="info-row">
          <div class="info-item">
            <strong>Description</strong>
            <textarea
              readonly>Lorem ipsum dolor sit amet consectetur. Consectetur amet sem lorem sit diam interdum et accumsan risus. Condimentum gravida ut nec interdum eget eget. Lorem ipsum dolor sit amet consectetur. Consectetur amet sem lorem sit diam interdum et accumsan risus. Condimentum gravida ut nec interdum eget eget.</textarea>
          </div>
        </div>
        <normalButton class="edit-button button--primary" label="Edit" iconName="EditPencil" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile-details {
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.info-box {
  background-color: var( --neutral-20);
  padding: 20px;
  border-radius: 10px;
  position: relative;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-item {
  flex: 1;
  margin-right: 20px;
}

.info-item strong {
  display: block;
  margin-bottom: 5px;
}

.info-item p {
  margin: 0;
}

textarea {
  width: 100%;
  height: 60px;
  border: 1px solid var(--white);
  border-radius: 5px;
  padding: 5px;
  resize: none;
}

.edit-button {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>