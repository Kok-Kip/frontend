import Vue from 'vue'
import SearchPage from '@/components/SearchPage'
import {shallowMount} from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const $route = {
  query: '天气'
}

const wrapper = shallowMount(SearchPage, {
  mocks: {
    $route
  }
})

var mock = new MockAdapter(axios)
mock.onGet().reply(200, {
  'data':{
    'data': []
  }
})

describe('SearchPage.vue', () => {

  it('input should render correct contents', () => {
    // const Constructor = Vue.extend(SearchPage)
    // const vm = new Constructor().$mount()
    expect(wrapper.vm.$el.querySelector('#search-text').placeholder)
      .toEqual('Kok Kip Your Answer...')
  })

  it('button should have correct title', ()=> {
    // const Constructor = Vue.extend(SearchPage)
    // const vm = new Constructor().$mount()
    expect(wrapper.vm.$el.querySelector('#voice-btn').title)
      .toEqual('search by voice')
  })
})
