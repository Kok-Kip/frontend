import Vue from 'vue'
import SearchEngine from '@/components/SearchEngine'

describe('SearchEngine.vue', () => {

  it('input should render correct contents', () => {
    const Constructor = Vue.extend(SearchEngine)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#search-text').placeholder)
      .toEqual('Kok Kip Your Answer...')
  })

  it('button should have correct title', ()=> {
    const Constructor = Vue.extend(SearchEngine)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#search-submit').title)
      .toEqual('search by voice')
  })
})
