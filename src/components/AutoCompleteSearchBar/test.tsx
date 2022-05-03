import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { render, screen } from '@testing-library/react'
import axios from 'axios'
import { shallow } from 'enzyme'

import AutoCompleteSearchBar from '.'
import myhealthfinderApi from '../../services/myhealthfinderApi'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

jest.mock('../../services/myhealthfinderApi')
jest.useFakeTimers()

describe('AutoCompleteSearchBar', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <AutoCompleteSearchBar />
      </BrowserRouter>
    )

    expect(
      screen.getByPlaceholderText('Type your search here')
    ).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(
      'Search for more results'
    )
  })

  it('should submit when enter is pressed', () => {
    const setSearchValueMock = jest.fn()
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => ['Hi', setSearchValueMock])

    const wrapper = shallow(<AutoCompleteSearchBar />)

    const input = wrapper.find('input')
    input.simulate('keydown', { key: 'Enter', target: { value: 'Hi' } })

    expect(setSearchValueMock).toBeCalledWith('')
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/search?keyword=Hi')
  })

  it('should call handleInputOnChange when input receive an value', () => {
    const setSearchValueMock = jest.fn()
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => ['Hi', setSearchValueMock])

    const wrapper = shallow(<AutoCompleteSearchBar />)

    const input = wrapper.find('input')
    input.simulate('change', { target: { value: 'Hi' } })

    expect(setSearchValueMock).toBeCalledWith('Hi')
  })

  it('should clear suggestions when input calls onBlur event', () => {
    const setSuggestionsMock = jest.fn()
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => ['Hi', jest.fn()])

    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      [
        {
          Type: 'Topic',
          Id: '25',
          Title: 'Keep Your Heart Healthy',
          TranslationId: '25',
          TranslationTitle: '',
          Categories: '',
          Populations: '',
          MyHFTitle: '',
          MyHFDescription: '',
          MyHFCategory: '',
          MyHFCategoryHeading: '',
          LastUpdate: '1625749723',
          ImageUrl: 'https://health.gov/sites/default/files/2020-01/kyhh.png',
          ImageAlt: 'Keep Your Heart Healthy',
          AccessibleVersion:
            'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/keep-your-heart-healthy',
          RelatedItems: {
            RelatedItem: [
              {
                Type: 'Topic',
                Id: '30544',
                Title:
                  'Talk with Your Doctor About Taking Aspirin to Prevent Disease',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/talk-your-doctor-about-taking-aspirin-prevent-disease'
              },
              {
                Type: 'Topic',
                Id: '30610',
                Title: 'Quit Smoking',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/diabetes/quit-smoking'
              },
              {
                Type: 'Topic',
                Id: '30606',
                Title: 'Alcohol Use: Conversation Starters',
                Url: 'https://health.gov/myhealthfinder/topics/everyday-healthy-living/mental-health-and-relationships/alcohol-use-conversation-starters'
              },
              {
                Type: 'Topic',
                Id: '30559',
                Title: 'Eat Less Sodium: Quick Tips',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/eat-less-sodium-quick-tips'
              },
              {
                Type: 'Topic',
                Id: '30596',
                Title: 'Healthy Eating: Conversation Starters',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/diabetes/healthy-eating-conversation-starters'
              },
              {
                Type: 'Topic',
                Id: '30605',
                Title: 'Heart Health: Conversation Starters',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/heart-health-conversation-starters'
              },
              {
                Type: 'Topic',
                Id: '30602',
                Title: 'Heart-Healthy Foods: Shopping List',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/heart-healthy-foods-shopping-list'
              },
              {
                Type: 'Topic',
                Id: '30597',
                Title: 'Help a Loved One Get More Active: Quick Tips',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/diabetes/help-loved-one-get-more-active-quick-tips'
              },
              {
                Type: 'Topic',
                Id: '30601',
                Title: 'Preventing Type 2 Diabetes: Questions for the Doctor',
                Url: 'https://health.gov/myhealthfinder/topics/doctor-visits/talking-doctor/preventing-type-2-diabetes-questions-doctor'
              },
              {
                Type: 'Topic',
                Id: '30598',
                Title: 'Losing Weight: Conversation starters',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/diabetes/losing-weight-conversation-starters'
              },
              {
                Type: 'Topic',
                Id: '30615',
                Title: 'Losing Weight: Questions for the Doctor',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/obesity/losing-weight-questions-doctor'
              },
              {
                Type: 'Topic',
                Id: '30588',
                Title: 'Quitting Smoking: Conversation Starters',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/cancer/quitting-smoking-conversation-starters'
              }
            ]
          },
          Sections: {
            section: [
              {
                Title: 'The Basics: Overview',
                Description: '',
                Content:
                  '\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EHeart\u0026nbsp;disease is the leading cause of death for both men and women in the United\u0026nbsp;States. Take steps today to lower your risk of heart disease.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ETo help prevent heart disease, you can:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EEat healthy\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EGet active\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EStay at a healthy\u0026nbsp;weight\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EQuit smoking and stay away from secondhand smoke\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EControl your cholesterol and blood pressure\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EDrink alcohol only in moderation\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EManage stress\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Ch3\u003EAm I at risk for heart disease?\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EAnyone can get heart disease, but you\u2019re at higher risk if you:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EHave high cholesterol, high blood pressure, or diabetes\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003ESmoke\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EAre overweight or have obesity\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EDon\u0027t get enough physical activity\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EDon\u0027t eat a healthy diet\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EYour age and family history also affect your risk for heart disease. Your risk is higher if:\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EYou\u2019re a woman over age 55\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EYou\u2019re a man over age 45\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EYour father or brother had heart disease before age 55\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EYour mother or sister had heart disease before age 65\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EBut the good news is there\u0027s a lot you can do to prevent heart disease.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'The Basics: What Is Heart Disease?',
                Description: '',
                Content:
                  '\u003Ch3\u003EWhat is heart disease?\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EWhen people talk about heart disease, they\u2019re usually talking about coronary heart disease (CHD). It\u2019s also sometimes called coronary artery disease (CAD). This is the most common type of heart disease.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EWhen someone has CHD, the coronary arteries (tubes) that take blood to the heart are narrow or blocked. This happens when cholesterol and fatty material, called plaque, build up inside the arteries.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EExperts aren\u2019t sure what causes plaque to build up. They think it may happen when your arteries get damaged by:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EToo much fat and cholesterol in the blood\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EHigh blood pressure\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003ESmoking\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EToo much sugar in the blood because of diabetes or other health problems\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EWhen plaque blocks an artery, it\u2019s hard for blood to flow to the heart. A blocked artery can cause chest pain or a heart attack.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/http/www.nhlbi.nih.gov/health/health-topics/topics/cad/?_label_=Learn+more+about+CHD\u0022\u003ELearn more about CHD\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Signs of a Heart Attack',
                Description: '',
                Content:
                  '\u003Ch3\u003EWhat is a heart attack?\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EA heart attack happens when blood flow to the heart is suddenly blocked. Part of the heart may die if the person doesn\u2019t get help quickly.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ESome common signs of a heart attack include:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EPain or discomfort in the center or left side of the chest \u2014 or a feeling of pressure, squeezing, or fullness\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EPain or discomfort in the upper body \u2014 like the arms, back, shoulders, neck, jaw, or upper stomach (above the belly button)\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EShortness of breath or trouble breathing (while resting or being active)\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EFeeling sick to your stomach or throwing up\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EStomach ache or feeling like you have heartburn\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EFeeling dizzy, light-headed, or unusually tired\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EBreaking out in a cold sweat\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ENot everyone who has a heart attack will have all the signs.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/http/www.nhlbi.nih.gov/health/health-topics/topics/heartattack/?_label_=Learn+more+about+the+signs+of+a+heart+attack\u0022\u003ELearn more about the signs of a heart attack\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EDon\u2019t ignore changes in how you feel.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ESigns of a heart attack often come on suddenly. But sometimes, they develop slowly \u2014 hours, days, or even weeks before a heart attack happens.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ETalk to your doctor if you feel unusually tired for several days, or if you develop any new health problems (like pain or trouble breathing). It\u0027s also important to talk to your doctor if existing health issues (like pain) are\u0026nbsp;bothering you more than usual.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you\u2019ve had a heart attack in the past, it\u2019s important to know that symptoms of a new heart attack might be different from your last one \u2014 so talk with your doctor if you have any concerns about how you feel.\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: When to Call 911',
                Description: '',
                Content:
                  '\u003Ch3\u003ECall 911 right away if you or someone else has signs of a heart attack.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EDon\u2019t ignore any signs or feel embarrassed to call for help. Acting fast can save a life \u2014 so call 911 even if you\u2019re not sure it\u2019s a heart attack.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EAn ambulance is the best and safest way to get to the hospital. In an ambulance, EMTs (emergency medical technicians) can keep track of how you\u2019re doing and start life-saving treatments right away.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EPeople who call an ambulance often get treated faster at the hospital. And when you call 911, the operator can tell you what to do until the ambulance gets there.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Know Your Numbers',
                Description: '',
                Content:
                  '\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ETake steps today to lower your risk for heart disease.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EControl your cholesterol and blood pressure.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EHigh cholesterol and high blood pressure can cause heart disease and heart attack. If your cholesterol or blood pressure numbers are high, you can take steps to lower them.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch4\u003EGet your cholesterol checked.\u003C/h4\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIt\u2019s important to\u0026nbsp;get your cholesterol checked\u0026nbsp;at least every 5 years. Some people will need to get it checked more or less often. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/doctor-visits/screening-tests/get-your-cholesterol-checked?_label_=Learn+more+about+cholesterol+testing\u0022\u003ELearn more about cholesterol testing\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch4\u003EGet your blood pressure checked.\u003C/h4\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EStarting at age 18,\u0026nbsp;get your blood pressure checked\u0026nbsp;regularly. High blood pressure has no signs or symptoms. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/doctor-visits/screening-tests/get-your-blood-pressure-checked?_label_=Get+the+facts+about+blood+pressure+testing\u0022\u003EGet the facts about blood pressure testing\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/?_label_=Use+the+MyHealthfinder+tool\u0022\u003EUse the MyHealthfinder tool\u003C/a\u003E\u0026nbsp;to get personalized recommendations for screening tests and vaccines.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Talk with Your Doctor',
                Description: '',
                Content:
                  '\u003Ch3\u003EKnow your family\u2019s health history.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EYour family history affects your risk for heart disease.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/phgkb.cdc.gov/FHH/html/index.html?_label_=Use+this+family+health+history+tool\u0022\u003EUse this family health history tool\u003C/a\u003E\u0026nbsp;to keep track of your family\u2019s health. Share the information with your doctor or nurse.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you\u2019re worried about a family member\u2019s risk for heart disease,\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/heart-health-conversation-starters?_label_=use+these+tips+to+start+a+conversation+about+heart+health\u0022\u003Euse these tips to start a conversation about heart health\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EAsk your doctor about taking aspirin every day.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you\u2019re age 50 to 59, taking aspirin every day can lower your risk of heart attack and stroke \u2014 but doctors don\u2019t recommend it for everyone. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/talk-your-doctor-about-taking-aspirin-prevent?_label_=Talk+with+your+doctor+to+find+out+if+taking+aspirin+is+the+right+choice+for+you\u0022\u003ETalk with your doctor to find out if taking aspirin is the right choice for you\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003E\u003Cstrong\u003ETalk to your doctor about taking medicine to lower your risk of heart attack and stroke.\u0026nbsp;\u003C/strong\u003E\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EExperts recommend that some people ages\u0026nbsp;40 to 75 take medicines called statins if they\u2019re at high risk for heart attack and stroke.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/doctor-visits/talking-with-the-doctor/medicines-to-prevent-heart-attack-and-stroke-questions-for-the-doctor?_label_=Use+these+questions+to+talk+with+your+doctor+about+statins\u0022\u003EUse these questions to talk with your doctor about statins\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Food and Alcohol',
                Description: '',
                Content:
                  '\u003Ch3\u003EEat healthy.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EEating healthy\u0026nbsp;can help lower your risk of heart disease. A heart-healthy diet includes foods that are low in\u0026nbsp;saturated fat, added sugars, and sodium (salt). \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/diabetes/eat-healthy?_label_=Learn+more+about+eating+healthy\u0022\u003ELearn more about eating healthy\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EHeart-healthy items include high-fiber foods (whole grains, fruits, and vegetables) and certain fats (like the fats in olive oil and fish).\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/heart-healthy-foods-shopping-list?_label_=Use+this+shopping+list+to+find+heart-healthy+foods\u0022\u003EUse this shopping list to find heart-healthy foods\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ECheck out these heart-healthy recipe collections:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/healthyeating.nhlbi.nih.gov/?_label_=Heart-Healthy+Cooking\u0022\u003EHeart-Healthy Cooking\u003C/a\u003E\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/www.nhlbi.nih.gov/sites/default/files/publications/WEHL-RecipeBook_508.pdf?_label_=Heart+Healthy+Home+Cooking+African+American+Style+%5BPDF%26nbsp%3B-%26nbsp%3B6.6%26nbsp%3BMB%5D\u0022\u003EHeart Healthy Home Cooking African American Style [PDF\u0026nbsp;-\u0026nbsp;6.6\u0026nbsp;MB]\u003C/a\u003E\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/http/www.nhlbi.nih.gov/files/docs/public/heart/sp_recip.pdf?_label_=Delicious+Heart+Healthy+Latino+Recipes+%5BPDF+-+3+MB%5D\u0022\u003EDelicious Heart Healthy Latino Recipes [PDF - 3 MB]\u003C/a\u003E (in English and Spanish)\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EDon\u2019t forget to make healthy choices when you eat out. For example, ask for a side salad instead of chips or french fries. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/http/www.nhlbi.nih.gov/health/educational/healthdisp/pdf/tipsheets/Tips-for-Eating-Out.pdf?_label_=Get+heart-healthy+tips+for+dining+out+%5BPDF+-+3+MB%5D\u0022\u003EGet heart-healthy tips for dining out [PDF - 3 MB]\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EDrink alcohol only in moderation.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EDrinking\u0026nbsp;too much alcohol can increase your risk of heart disease. So if you choose to drink alcohol,\u0026nbsp;drink only in moderation. That means 1 drink or less in a day for women and 2 drinks or less in a day for men. \u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/drink-alcohol-only-moderation?_label_=Learn+more+about+drinking+alcohol+only+in+moderation\u0022\u003ELearn more about drinking alcohol only in moderation\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Physical Activity',
                Description: '',
                Content:
                  '\u003Ch3\u003EGet active.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EGetting regular physical activity can help prevent heart disease. Adults need at least 150 minutes of moderate-intensity aerobic activity each week. This includes anything that gets your heart beating faster \u2014\u0026nbsp;like walking, dancing, and biking.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you\u2019re just getting started, take it slow! Try fitting a quick walk into your day. Even 5 minutes has real health benefits \u2014\u0026nbsp;and you can build up to more activity over time. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/diabetes/get-active?_label_=Learn+more+about+getting+active\u0022\u003ELearn more about getting active\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EStay at a healthy weight.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EPeople who are overweight or have obesity are at an increased risk for heart disease, high blood pressure, and\u0026nbsp;type 2 diabetes.\u003Cbr /\u003E\r\n\u003Cbr /\u003E\r\nIf you\u2019re overweight or have obesity, losing 5 to 10 percent of your body weight can help lower your risk of heart disease. For example, if you weigh 200 pounds, that would mean losing 10 to 20 pounds.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/diabetes/watch-your-weight?_label_=Find+out+how+to+control+your+weight\u0022\u003EFind out how to control your weight\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you don\u0027t know if you\u2019re at a healthy weight,\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/english_bmi_calculator/bmi_calculator.html?_label_=use+this+calculator%26nbsp%3Bto+figure+out+your+body+mass+index+%28BMI%29\u0022\u003Euse this calculator\u0026nbsp;to figure out your body mass index (BMI)\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Healthy Habits',
                Description: '',
                Content:
                  '\u003Ch3\u003EQuit smoking and stay away from secondhand smoke.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EQuitting smoking\u0026nbsp;helps lower your risk of heart disease and heart attack. Call 1-800-QUIT-NOW (1-800-784-8669) for free support and to set up your plan for quitting. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/diabetes/quit-smoking?_label_=Get+more+information+about+quitting+smoking\u0022\u003EGet more information about quitting smoking\u003C/a\u003E. \u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EAvoiding secondhand smoke is important, too \u2014 so keep your home smoke-free. If you have guests who smoke, ask them to smoke outside. If someone in your home smokes,\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/cancer/quitting-smoking-conversation-starters?_label_=use+these+tips+to+start+a+conversation+about+quitting\u0022\u003Euse these tips to start a conversation about quitting\u003C/a\u003E. \u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EManage stress.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EManaging stress can help prevent serious health problems like heart disease, depression, and high blood pressure. Deep breathing and meditation are good ways to relax and manage stress. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/manage-stress?_label_=Get+more+ideas+for+how+to+manage+stress\u0022\u003EGet more ideas for how to manage stress\u003C/a\u003E. \u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              }
            ]
          },
          MoreInfoItems: null,
          HealthfinderLogo:
            'https://health.gov/themes/custom/healthfinder/images/MyHF.svg',
          HealthfinderUrl: 'https://health.gov/myhealthfinder'
        }
      ],
      setSuggestionsMock
    ])

    const wrapper = shallow(<AutoCompleteSearchBar />)
    const input = wrapper.find('input')

    const span = wrapper.find('span')
    expect(span.text()).toBe('Keep Your Heart Healthy')

    input.simulate('blur')

    expect(setSuggestionsMock).toBeCalledWith([])
  })

  it('should not clear suggestion when user click on a link', () => {
    const setSuggestionsMock = jest.fn()
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => ['Hi', jest.fn()])

    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      [
        {
          Type: 'Topic',
          Id: '25',
          Title: 'Keep Your Heart Healthy',
          TranslationId: '25',
          TranslationTitle: '',
          Categories: '',
          Populations: '',
          MyHFTitle: '',
          MyHFDescription: '',
          MyHFCategory: '',
          MyHFCategoryHeading: '',
          LastUpdate: '1625749723',
          ImageUrl: 'https://health.gov/sites/default/files/2020-01/kyhh.png',
          ImageAlt: 'Keep Your Heart Healthy',
          AccessibleVersion:
            'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/keep-your-heart-healthy',
          RelatedItems: {
            RelatedItem: [
              {
                Type: 'Topic',
                Id: '30544',
                Title:
                  'Talk with Your Doctor About Taking Aspirin to Prevent Disease',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/talk-your-doctor-about-taking-aspirin-prevent-disease'
              },
              {
                Type: 'Topic',
                Id: '30610',
                Title: 'Quit Smoking',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/diabetes/quit-smoking'
              },
              {
                Type: 'Topic',
                Id: '30606',
                Title: 'Alcohol Use: Conversation Starters',
                Url: 'https://health.gov/myhealthfinder/topics/everyday-healthy-living/mental-health-and-relationships/alcohol-use-conversation-starters'
              },
              {
                Type: 'Topic',
                Id: '30559',
                Title: 'Eat Less Sodium: Quick Tips',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/eat-less-sodium-quick-tips'
              },
              {
                Type: 'Topic',
                Id: '30596',
                Title: 'Healthy Eating: Conversation Starters',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/diabetes/healthy-eating-conversation-starters'
              },
              {
                Type: 'Topic',
                Id: '30605',
                Title: 'Heart Health: Conversation Starters',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/heart-health-conversation-starters'
              },
              {
                Type: 'Topic',
                Id: '30602',
                Title: 'Heart-Healthy Foods: Shopping List',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/heart-health/heart-healthy-foods-shopping-list'
              },
              {
                Type: 'Topic',
                Id: '30597',
                Title: 'Help a Loved One Get More Active: Quick Tips',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/diabetes/help-loved-one-get-more-active-quick-tips'
              },
              {
                Type: 'Topic',
                Id: '30601',
                Title: 'Preventing Type 2 Diabetes: Questions for the Doctor',
                Url: 'https://health.gov/myhealthfinder/topics/doctor-visits/talking-doctor/preventing-type-2-diabetes-questions-doctor'
              },
              {
                Type: 'Topic',
                Id: '30598',
                Title: 'Losing Weight: Conversation starters',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/diabetes/losing-weight-conversation-starters'
              },
              {
                Type: 'Topic',
                Id: '30615',
                Title: 'Losing Weight: Questions for the Doctor',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/obesity/losing-weight-questions-doctor'
              },
              {
                Type: 'Topic',
                Id: '30588',
                Title: 'Quitting Smoking: Conversation Starters',
                Url: 'https://health.gov/myhealthfinder/topics/health-conditions/cancer/quitting-smoking-conversation-starters'
              }
            ]
          },
          Sections: {
            section: [
              {
                Title: 'The Basics: Overview',
                Description: '',
                Content:
                  '\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EHeart\u0026nbsp;disease is the leading cause of death for both men and women in the United\u0026nbsp;States. Take steps today to lower your risk of heart disease.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ETo help prevent heart disease, you can:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EEat healthy\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EGet active\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EStay at a healthy\u0026nbsp;weight\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EQuit smoking and stay away from secondhand smoke\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EControl your cholesterol and blood pressure\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EDrink alcohol only in moderation\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EManage stress\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Ch3\u003EAm I at risk for heart disease?\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EAnyone can get heart disease, but you\u2019re at higher risk if you:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EHave high cholesterol, high blood pressure, or diabetes\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003ESmoke\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EAre overweight or have obesity\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EDon\u0027t get enough physical activity\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EDon\u0027t eat a healthy diet\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EYour age and family history also affect your risk for heart disease. Your risk is higher if:\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EYou\u2019re a woman over age 55\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EYou\u2019re a man over age 45\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EYour father or brother had heart disease before age 55\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EYour mother or sister had heart disease before age 65\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EBut the good news is there\u0027s a lot you can do to prevent heart disease.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'The Basics: What Is Heart Disease?',
                Description: '',
                Content:
                  '\u003Ch3\u003EWhat is heart disease?\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EWhen people talk about heart disease, they\u2019re usually talking about coronary heart disease (CHD). It\u2019s also sometimes called coronary artery disease (CAD). This is the most common type of heart disease.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EWhen someone has CHD, the coronary arteries (tubes) that take blood to the heart are narrow or blocked. This happens when cholesterol and fatty material, called plaque, build up inside the arteries.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EExperts aren\u2019t sure what causes plaque to build up. They think it may happen when your arteries get damaged by:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EToo much fat and cholesterol in the blood\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EHigh blood pressure\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003ESmoking\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EToo much sugar in the blood because of diabetes or other health problems\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EWhen plaque blocks an artery, it\u2019s hard for blood to flow to the heart. A blocked artery can cause chest pain or a heart attack.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/http/www.nhlbi.nih.gov/health/health-topics/topics/cad/?_label_=Learn+more+about+CHD\u0022\u003ELearn more about CHD\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Signs of a Heart Attack',
                Description: '',
                Content:
                  '\u003Ch3\u003EWhat is a heart attack?\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EA heart attack happens when blood flow to the heart is suddenly blocked. Part of the heart may die if the person doesn\u2019t get help quickly.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ESome common signs of a heart attack include:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EPain or discomfort in the center or left side of the chest \u2014 or a feeling of pressure, squeezing, or fullness\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EPain or discomfort in the upper body \u2014 like the arms, back, shoulders, neck, jaw, or upper stomach (above the belly button)\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EShortness of breath or trouble breathing (while resting or being active)\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EFeeling sick to your stomach or throwing up\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EStomach ache or feeling like you have heartburn\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EFeeling dizzy, light-headed, or unusually tired\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003EBreaking out in a cold sweat\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ENot everyone who has a heart attack will have all the signs.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/http/www.nhlbi.nih.gov/health/health-topics/topics/heartattack/?_label_=Learn+more+about+the+signs+of+a+heart+attack\u0022\u003ELearn more about the signs of a heart attack\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EDon\u2019t ignore changes in how you feel.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ESigns of a heart attack often come on suddenly. But sometimes, they develop slowly \u2014 hours, days, or even weeks before a heart attack happens.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ETalk to your doctor if you feel unusually tired for several days, or if you develop any new health problems (like pain or trouble breathing). It\u0027s also important to talk to your doctor if existing health issues (like pain) are\u0026nbsp;bothering you more than usual.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you\u2019ve had a heart attack in the past, it\u2019s important to know that symptoms of a new heart attack might be different from your last one \u2014 so talk with your doctor if you have any concerns about how you feel.\u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: When to Call 911',
                Description: '',
                Content:
                  '\u003Ch3\u003ECall 911 right away if you or someone else has signs of a heart attack.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EDon\u2019t ignore any signs or feel embarrassed to call for help. Acting fast can save a life \u2014 so call 911 even if you\u2019re not sure it\u2019s a heart attack.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EAn ambulance is the best and safest way to get to the hospital. In an ambulance, EMTs (emergency medical technicians) can keep track of how you\u2019re doing and start life-saving treatments right away.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EPeople who call an ambulance often get treated faster at the hospital. And when you call 911, the operator can tell you what to do until the ambulance gets there.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Know Your Numbers',
                Description: '',
                Content:
                  '\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ETake steps today to lower your risk for heart disease.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EControl your cholesterol and blood pressure.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EHigh cholesterol and high blood pressure can cause heart disease and heart attack. If your cholesterol or blood pressure numbers are high, you can take steps to lower them.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch4\u003EGet your cholesterol checked.\u003C/h4\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIt\u2019s important to\u0026nbsp;get your cholesterol checked\u0026nbsp;at least every 5 years. Some people will need to get it checked more or less often. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/doctor-visits/screening-tests/get-your-cholesterol-checked?_label_=Learn+more+about+cholesterol+testing\u0022\u003ELearn more about cholesterol testing\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch4\u003EGet your blood pressure checked.\u003C/h4\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EStarting at age 18,\u0026nbsp;get your blood pressure checked\u0026nbsp;regularly. High blood pressure has no signs or symptoms. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/doctor-visits/screening-tests/get-your-blood-pressure-checked?_label_=Get+the+facts+about+blood+pressure+testing\u0022\u003EGet the facts about blood pressure testing\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/?_label_=Use+the+MyHealthfinder+tool\u0022\u003EUse the MyHealthfinder tool\u003C/a\u003E\u0026nbsp;to get personalized recommendations for screening tests and vaccines.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Talk with Your Doctor',
                Description: '',
                Content:
                  '\u003Ch3\u003EKnow your family\u2019s health history.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EYour family history affects your risk for heart disease.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/phgkb.cdc.gov/FHH/html/index.html?_label_=Use+this+family+health+history+tool\u0022\u003EUse this family health history tool\u003C/a\u003E\u0026nbsp;to keep track of your family\u2019s health. Share the information with your doctor or nurse.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you\u2019re worried about a family member\u2019s risk for heart disease,\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/heart-health-conversation-starters?_label_=use+these+tips+to+start+a+conversation+about+heart+health\u0022\u003Euse these tips to start a conversation about heart health\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EAsk your doctor about taking aspirin every day.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you\u2019re age 50 to 59, taking aspirin every day can lower your risk of heart attack and stroke \u2014 but doctors don\u2019t recommend it for everyone. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/talk-your-doctor-about-taking-aspirin-prevent?_label_=Talk+with+your+doctor+to+find+out+if+taking+aspirin+is+the+right+choice+for+you\u0022\u003ETalk with your doctor to find out if taking aspirin is the right choice for you\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003E\u003Cstrong\u003ETalk to your doctor about taking medicine to lower your risk of heart attack and stroke.\u0026nbsp;\u003C/strong\u003E\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EExperts recommend that some people ages\u0026nbsp;40 to 75 take medicines called statins if they\u2019re at high risk for heart attack and stroke.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/doctor-visits/talking-with-the-doctor/medicines-to-prevent-heart-attack-and-stroke-questions-for-the-doctor?_label_=Use+these+questions+to+talk+with+your+doctor+about+statins\u0022\u003EUse these questions to talk with your doctor about statins\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Food and Alcohol',
                Description: '',
                Content:
                  '\u003Ch3\u003EEat healthy.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EEating healthy\u0026nbsp;can help lower your risk of heart disease. A heart-healthy diet includes foods that are low in\u0026nbsp;saturated fat, added sugars, and sodium (salt). \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/diabetes/eat-healthy?_label_=Learn+more+about+eating+healthy\u0022\u003ELearn more about eating healthy\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EHeart-healthy items include high-fiber foods (whole grains, fruits, and vegetables) and certain fats (like the fats in olive oil and fish).\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/heart-healthy-foods-shopping-list?_label_=Use+this+shopping+list+to+find+heart-healthy+foods\u0022\u003EUse this shopping list to find heart-healthy foods\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003ECheck out these heart-healthy recipe collections:\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cul\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/healthyeating.nhlbi.nih.gov/?_label_=Heart-Healthy+Cooking\u0022\u003EHeart-Healthy Cooking\u003C/a\u003E\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/www.nhlbi.nih.gov/sites/default/files/publications/WEHL-RecipeBook_508.pdf?_label_=Heart+Healthy+Home+Cooking+African+American+Style+%5BPDF%26nbsp%3B-%26nbsp%3B6.6%26nbsp%3BMB%5D\u0022\u003EHeart Healthy Home Cooking African American Style [PDF\u0026nbsp;-\u0026nbsp;6.6\u0026nbsp;MB]\u003C/a\u003E\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\t\u003Cli\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/http/www.nhlbi.nih.gov/files/docs/public/heart/sp_recip.pdf?_label_=Delicious+Heart+Healthy+Latino+Recipes+%5BPDF+-+3+MB%5D\u0022\u003EDelicious Heart Healthy Latino Recipes [PDF - 3 MB]\u003C/a\u003E (in English and Spanish)\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EDon\u2019t forget to make healthy choices when you eat out. For example, ask for a side salad instead of chips or french fries. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/http/www.nhlbi.nih.gov/health/educational/healthdisp/pdf/tipsheets/Tips-for-Eating-Out.pdf?_label_=Get+heart-healthy+tips+for+dining+out+%5BPDF+-+3+MB%5D\u0022\u003EGet heart-healthy tips for dining out [PDF - 3 MB]\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EDrink alcohol only in moderation.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EDrinking\u0026nbsp;too much alcohol can increase your risk of heart disease. So if you choose to drink alcohol,\u0026nbsp;drink only in moderation. That means 1 drink or less in a day for women and 2 drinks or less in a day for men. \u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003E\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/drink-alcohol-only-moderation?_label_=Learn+more+about+drinking+alcohol+only+in+moderation\u0022\u003ELearn more about drinking alcohol only in moderation\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Physical Activity',
                Description: '',
                Content:
                  '\u003Ch3\u003EGet active.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EGetting regular physical activity can help prevent heart disease. Adults need at least 150 minutes of moderate-intensity aerobic activity each week. This includes anything that gets your heart beating faster \u2014\u0026nbsp;like walking, dancing, and biking.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you\u2019re just getting started, take it slow! Try fitting a quick walk into your day. Even 5 minutes has real health benefits \u2014\u0026nbsp;and you can build up to more activity over time. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/diabetes/get-active?_label_=Learn+more+about+getting+active\u0022\u003ELearn more about getting active\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EStay at a healthy weight.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EPeople who are overweight or have obesity are at an increased risk for heart disease, high blood pressure, and\u0026nbsp;type 2 diabetes.\u003Cbr /\u003E\r\n\u003Cbr /\u003E\r\nIf you\u2019re overweight or have obesity, losing 5 to 10 percent of your body weight can help lower your risk of heart disease. For example, if you weigh 200 pounds, that would mean losing 10 to 20 pounds.\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/diabetes/watch-your-weight?_label_=Find+out+how+to+control+your+weight\u0022\u003EFind out how to control your weight\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EIf you don\u0027t know if you\u2019re at a healthy weight,\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/english_bmi_calculator/bmi_calculator.html?_label_=use+this+calculator%26nbsp%3Bto+figure+out+your+body+mass+index+%28BMI%29\u0022\u003Euse this calculator\u0026nbsp;to figure out your body mass index (BMI)\u003C/a\u003E.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              },
              {
                Title: 'Take Action: Healthy Habits',
                Description: '',
                Content:
                  '\u003Ch3\u003EQuit smoking and stay away from secondhand smoke.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EQuitting smoking\u0026nbsp;helps lower your risk of heart disease and heart attack. Call 1-800-QUIT-NOW (1-800-784-8669) for free support and to set up your plan for quitting. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/diabetes/quit-smoking?_label_=Get+more+information+about+quitting+smoking\u0022\u003EGet more information about quitting smoking\u003C/a\u003E. \u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EAvoiding secondhand smoke is important, too \u2014 so keep your home smoke-free. If you have guests who smoke, ask them to smoke outside. If someone in your home smokes,\u0026nbsp;\u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/cancer/quitting-smoking-conversation-starters?_label_=use+these+tips+to+start+a+conversation+about+quitting\u0022\u003Euse these tips to start a conversation about quitting\u003C/a\u003E. \u0026nbsp;\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n\r\n\u003Ch3\u003EManage stress.\u003C/h3\u003E\r\n\r\n\u003Cp\u003E\u003Cspan\u003E\u003Cspan\u003EManaging stress can help prevent serious health problems like heart disease, depression, and high blood pressure. Deep breathing and meditation are good ways to relax and manage stress. \u003Ca href=\u0022https://health.gov/myhealthfinder/api/outlink/topicsearch.json/https/health.gov/myhealthfinder/topics/health-conditions/heart-health/manage-stress?_label_=Get+more+ideas+for+how+to+manage+stress\u0022\u003EGet more ideas for how to manage stress\u003C/a\u003E. \u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\r\n'
              }
            ]
          },
          MoreInfoItems: null,
          HealthfinderLogo:
            'https://health.gov/themes/custom/healthfinder/images/MyHF.svg',
          HealthfinderUrl: 'https://health.gov/myhealthfinder'
        }
      ],
      setSuggestionsMock
    ])

    const wrapper = shallow(<AutoCompleteSearchBar />)
    const input = wrapper.find('input')

    const span = wrapper.find('span')
    expect(span.text()).toBe('Keep Your Heart Healthy')

    input.simulate('blur', { relatedTarget: { localName: 'a' } })

    expect(setSuggestionsMock).not.toBeCalledWith([])
  })

  it('should call getSuggestions after 1500ms with searchValue empty', () => {
    const setSuggestionsMock = jest.fn()
    jest.spyOn(React, 'useState').mockImplementationOnce(() => ['', jest.fn()])
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [[], setSuggestionsMock])

    jest.useFakeTimers()

    let cleanupFunc
    jest.spyOn(React, 'useEffect').mockImplementationOnce((func) => {
      cleanupFunc = func()
    })

    shallow(<AutoCompleteSearchBar />)
    jest.advanceTimersByTime(2000)

    expect(setSuggestionsMock).toBeCalled()
  })

  it('should call getSuggestions after 1500ms with searchValue filled', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => ['Heart', jest.fn()])

    jest.spyOn(React, 'useEffect').mockImplementationOnce((func) => func())
    const myhealthfinderApiMock = myhealthfinderApi as jest.Mocked<typeof axios>
    myhealthfinderApiMock.get.mockImplementation(() =>
      Promise.resolve({ data: { Result: { Resources: { Resource: [] } } } })
    )

    shallow(<AutoCompleteSearchBar />)
    jest.advanceTimersByTime(2000)

    expect(myhealthfinderApiMock.get).toHaveBeenCalledWith(
      '/topicSearch.json?keyword=Heart'
    )
  })

  it('should return an error from the request', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => ['Heart', jest.fn()])

    jest.spyOn(React, 'useEffect').mockImplementationOnce((func) => func())
    const myhealthfinderApiMock = myhealthfinderApi as jest.Mocked<typeof axios>
    myhealthfinderApiMock.get.mockImplementation(() =>
      Promise.reject({ error: {} })
    )

    shallow(<AutoCompleteSearchBar />)
    jest.advanceTimersByTime(2000)

    expect(myhealthfinderApiMock.get).toHaveBeenCalledWith(
      '/topicSearch.json?keyword=Heart'
    )
  })
})
