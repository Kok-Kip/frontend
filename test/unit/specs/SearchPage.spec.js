import Vue from 'vue'
import SearchPage from '@/components/SearchPage'

describe('SearchPage.vue', () => {

  it('input should render correct contents', () => {
    const Constructor = Vue.extend(SearchPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#search-text').placeholder)
      .toEqual('Kok Kip Your Answer...')
  })

  it('button should have correct title', ()=> {
    const Constructor = Vue.extend(SearchPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#search-submit').title)
      .toEqual('search by voice')
  })
})
