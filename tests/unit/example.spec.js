import { shallowMount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'

describe('LoginForm.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(LoginForm, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
