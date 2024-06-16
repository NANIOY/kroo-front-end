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
            <span class="label">Name</span>
            <p>Lorem Ipsum</p>
          </div>
          <div class="info-item">
            <span class="label">Email</span>
            <p>Lorem Ipsum</p>
          </div>
          <div class="info-item">
            <span class="label">Age</span>
            <p>Lorem Ipsum</p>
          </div>
        </div>
        <div class="info-row">
          <div class="info-item">
            <span class="label">Function</span>
            <p>Lorem Ipsum</p>
          </div>
          <div class="info-item">
            <span class="label">Languages</span>
            <p>Lorem Ipsum</p>
          </div>
          <div class="info-item">
            <span class="label">Skills</span>
            <p>Lorem Ipsum</p>
          </div>
        </div>
        <div class="info-row">
          <div class="info-item">
            <span class="label">Description</span>
            <textarea
              readonly>Lorem ipsum dolor sit amet consectetur. Consectetur amet sem lorem sit diam interdum et accumsan risus. Condimentum gravida ut nec interdum eget eget. Lorem ipsum dolor sit amet consectetur. Consectetur amet sem lorem sit diam interdum et accumsan risus. Condimentum gravida ut nec interdum eget eget.</textarea>
          </div>
        </div>
        <normalButton class="edit-button button--primary" label="Edit" iconName="EditPencil" />
      </div>
    </section>
  </div>
</template>>

<style scoped>
.profile-details {
  padding: 20px;
  font-family: var(--font-body);
}

.section {
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  font-family: var(--font-header, 'header');
}

.info-box {
  background-color: var(--neutral-20);
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

.info-item .label {
  display: block;
  margin-bottom: 5px;
  color: var(--color-text-text-primary);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
}

.info-item p {
  margin: 0;
  font-family: var(--font-body, 'body');
}

textarea {
  width: 100%;
  height: 60px;
  border: 1px solid var(--white);
  border-radius: 5px;
  padding: 5px;
  resize: none;
  font-family: var(--font-body, 'body');
}

.edit-button {
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  width: 136px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-family: var(--font-button, 'button');
}
</style>