<script>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import Slider from '../../atoms/inputs/Slider.vue';

export default {
  components: {
    NormalButton,
    Slider,
  },
};
</script>

<template>
  <div class="profile-details">
    <section class="profile-details__section profile-details__section--personal-info">
      <h1 class="profile-details__title">Personal Information</h1>
      <div class="profile-details__info-box">
        <div class="profile-details__info-row">
          <div class="profile-details__info-item">
            <span class="profile-details__label">Name</span>
            <p class="profile-details__text">Lorem Ipsum</p>
          </div>
          <div class="profile-details__info-item">
            <span class="profile-details__label">Email</span>
            <p class="profile-details__text">Lorem Ipsum</p>
          </div>
          <div class="profile-details__info-item">
            <span class="profile-details__label">Age</span>
            <p class="profile-details__text">Lorem Ipsum</p>
          </div>
        </div>
        <div class="profile-details__info-row">
          <div class="profile-details__info-item">
            <span class="profile-details__label">Function</span>
            <p class="profile-details__text">Lorem Ipsum</p>
          </div>
          <div class="profile-details__info-item">
            <span class="profile-details__label">Languages</span>
            <p class="profile-details__text">Lorem Ipsum</p>
          </div>
          <div class="profile-details__info-item">
            <span class="profile-details__label">Skills</span>
            <p class="profile-details__text">Lorem Ipsum</p>
          </div>
        </div>
        <div class="profile-details__info-row">
          <div class="profile-details__info-item">
            <span class="profile-details__label">Description</span>
            <textarea class="profile-details__textarea"
              readonly>Lorem ipsum dolor sit amet consectetur. Consectetur amet sem lorem sit diam interdum et accumsan risus. Condimentum gravida ut nec interdum eget eget. Lorem ipsum dolor sit amet consectetur. Consectetur amet sem lorem sit diam interdum et accumsan risus. Condimentum gravida ut nec interdum eget eget.</textarea>
          </div>
        </div>
        <NormalButton class="profile-details__edit-button button--primary" label="Edit" iconName="EditPencil" />
      </div>
    </section>

    <section class="profile-details__section profile-details__section--address-info">
      <h1 class="profile-details__title">Address</h1>
      <div class="profile-details__info-box">
        <div class="profile-details__info-row">
          <div class="profile-details__info-item">
            <span class="profile-details__label">Location</span>
            <p class="profile-details__text">Lorem Ipsum</p>
          </div>
          <div class="profile-details__info-item">
            <span class="profile-details__label">State/Province</span>
            <p class="profile-details__text">Lorem Ipsum</p>
          </div>
          <div class="profile-details__info-item">
            <span class="profile-details__label">Country</span>
            <p class="profile-details__text">Lorem Ipsum</p>
          </div>
        </div>
        <div class="profile-details__info-row">
        </div>
        <NormalButton class="profile-details__edit-button button--primary" label="Edit" iconName="EditPencil" />
      </div>
    </section>

    <div class="profile-details__buttons-container">
      <div class="profile-details__buttons">
        <NormalButton class="profile-details__verification-button button--secondary" label="Add 2-step verification" />
        <NormalButton class="profile-details__password-button button--tertiary" label="Change password" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-details {
  padding: 20px;
  font-family: var(--font-body);
  width: 100%;
  margin-top: -20px;
}

.profile-details__section {
  margin-bottom: 20px;
}

.profile-details__title {
  font-size: 24px;
  margin-bottom: 10px;
  font-family: var(--font-header, 'header');
}

.profile-details__info-box {
  background-color: var(--neutral-20);
  padding: 20px;
  border-radius: 10px;
  position: relative;
}

.profile-details__info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.profile-details__info-item {
  flex: 1;
  margin-right: 20px;
}

.profile-details__label {
  display: block;
  margin-bottom: 5px;
  color: var(--color-text-text-primary, #0E0F0F);
  font-family: Orkney;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
}

.profile-details__text {
  margin: 0;
  font-family: var(--font-body, 'body');
}

.profile-details__textarea {
  width: 100%;
  height: 60px;
  border: 1px solid var(--white);
  border-radius: 5px;
  padding: 5px;
  resize: none;
  font-family: var(--font-body, 'body');
}

.profile-details__edit-button {
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

.profile-details__buttons-container {
  display: flex;
  height: 40px;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
}

.profile-details__buttons {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.profile-details__verification-button,
.profile-details__password-button {
  padding-left: 32px;
  padding-right: 32px;
}
</style>