<script lang="ts">
  import Header from '$components/Header.svelte';
  import Layout from '$components/Layout.svelte';
  import { translations } from '$stores/translations';
  import { config } from '$stores/config';
  import { macros } from '$stores/macros';
  import Input from '$components/Modal/Input.svelte';
  import Option from '$components/Modal/Option.svelte';
  import Select from '$components/Modal/Select.svelte';
  import Section from '$components/Settings/Section.svelte';
  import SubSection from '$components/Settings/SubSection.svelte';
  import KeyboardShortcuts from '$components/Settings/KeyboardShortcuts.svelte';
  import WordsPhrasesWindows from '$components/Settings/WordsPhrasesWindows.svelte';
  import Button from '$components/Modal/Button.svelte';
  import Macros from '$components/Settings/Macros.svelte';
</script>

<Header />

<Layout>
  <div class="text-4xl px-4 h-16 border-b border-b-neutral-600 flex items-center">
    <span>{$translations.navigation.settings}</span>
  </div>

  <div class="fixed overflow-hidden overflow-y-scroll w-full h-[calc(100%-64px-48px)] flex flex-col gap-4 px-4 py-2">
    <Section>
      <span slot="title">{$translations.settings.update.this.name}</span>
      <span slot="description">{$translations.settings.update.this.description}</span>

      <div slot="content">
        <SubSection>
          <span slot="title">{$translations.settings.update.checkOnStartup.name}</span>
          <span slot="description">{$translations.settings.update.checkOnStartup.description}</span>

          <Select
            slot="content"
            bind:value="{$config.update.checkOnStartup}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.update.allowPrerelease.name}</span>
          <span slot="description">{$translations.settings.update.allowPrerelease.description}</span>

          <Select
            slot="content"
            bind:value="{$config.update.allowPrerelease}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.update.allowDowngrade.name}</span>
          <span slot="description">{$translations.settings.update.allowDowngrade.description}</span>

          <Select
            slot="content"
            bind:value="{$config.update.allowDowngrade}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.update.autoCheck.name}</span>
          <span slot="description">{$translations.settings.update.autoCheck.description}</span>

          <Select
            slot="content"
            bind:value="{$config.update.autoCheck}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.update.checkInterval.name}</span>
          <span slot="description">{$translations.settings.update.checkInterval.description}</span>

          <Input
            slot="content"
            bind:value="{$config.update.checkInterval}"
            type="number"
            text="{$translations.time.normal.m}"
            textPos="after"
          />
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.update.checkChromeUpdates.name}</span>
          <span slot="description">{$translations.settings.update.checkChromeUpdates.description}</span>

          <Select
            slot="content"
            bind:value="{$config.update.checkChromeUpdates}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>
      </div>
    </Section>

    <Section>
      <span slot="title">{$translations.settings.logs.this.name}</span>
      <span slot="description">{$translations.settings.logs.this.description}</span>

      <div slot="content">
        <SubSection>
          <span slot="title">{$translations.settings.logs.debug.name}</span>
          <span slot="description">{$translations.settings.logs.debug.description}</span>

          <Select
            slot="content"
            bind:value="{$config.logs.debug}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.logs.saveToFile.name}</span>
          <span slot="description">{$translations.settings.logs.saveToFile.description}</span>

          <Select
            slot="content"
            bind:value="{$config.logs.saveToFile}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>
      </div>
    </Section>

    <Section>
      <span slot="title">{$translations.settings.input.this.name}</span>
      <span slot="description">{$translations.settings.input.this.description}</span>

      <div slot="content">
        <SubSection>
          <span slot="title">{$translations.settings.input.holdToActivate.name}</span>
          <span slot="description">{$translations.settings.input.holdToActivate.description}</span>

          <Select
            slot="content"
            bind:value="{$config.input.holdToActivate}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.input.keyboardShortcuts.name}</span>
          <span slot="description">{$translations.settings.input.keyboardShortcuts.description}</span>

          <KeyboardShortcuts
            slot="content"
            bind:keyboardShortcuts="{$config.input.keyboardShortcuts}"
          />
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.input.autoRelease.name}</span>
          <span slot="description">{$translations.settings.input.autoRelease.description}</span>

          <Select
            slot="content"
            bind:value="{$config.input.autoRelease.enabled}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.input.releaseTime.name}</span>
          <span slot="description">{$translations.settings.input.releaseTime.description}</span>

          <Input
            slot="content"
            bind:value="{$config.input.autoRelease.releaseTime}"
            type="number"
            text="{$translations.time.normal.s}"
            textPos="after"
            disabled="{!$config.input.autoRelease.enabled}"
          />
        </SubSection>
      </div>
    </Section>

    <Section>
      <span slot="title">{$translations.settings.output.this.name}</span>
      <span slot="description">{$translations.settings.output.this.description}</span>

      <div slot="content">
        <SubSection>
          <span slot="title">{$translations.settings.output.partial.name}</span>
          <span slot="description">{$translations.settings.output.partial.description}</span>

          <Select
            slot="content"
            bind:value="{$config.output.partial}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.output.animated.name}</span>
          <span slot="description">{$translations.settings.output.animated.description}</span>

          <Select
            slot="content"
            bind:value="{$config.output.animated}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.output.typingDelay.name}</span>
          <span slot="description">{$translations.settings.output.typingDelay.description}</span>

          <Input
            bind:value="{$config.output.typingDelay}"
            slot="content"
            type="number"
            text="{$translations.time.normal.ms}"
            textPos="after"
            disabled="{!$config.output.animated}"
          />
        </SubSection>
      </div>
    </Section>

    <Section>
      <span slot="title">{$translations.settings.feedback.this.name}</span>
      <span slot="description">{$translations.settings.feedback.this.description}</span>

      <div slot="content">
        <SubSection>
          <span slot="title">{$translations.settings.feedback.sounds.name}</span>
          <span slot="description">{$translations.settings.feedback.sounds.description}</span>

          <div slot="content">
            <Select bind:value="{$config.feedback.sounds.enabled}">
              <Option value="{true}">{$translations.states.enable}</Option>
              <Option value="{false}">{$translations.states.disable}</Option>
            </Select>
          </div>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.feedback.sounds.audioMode.name}</span>
          <span slot="description">{$translations.settings.feedback.sounds.audioMode.description}</span>

          <div slot="content">
            <Select
              bind:value="{$config.feedback.sounds.mode}"
              disabled="{!$config.feedback.sounds.enabled}"
            >
              <Option value="default">{$translations.states.default}</Option>
              <Option value="custom">{$translations.states.custom}</Option>
            </Select>
          </div>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.feedback.sounds.audioVolume.name}</span>
          <span slot="description">{$translations.settings.feedback.sounds.audioVolume.description}</span>

          <div slot="content">
            <div class="flex gap-1">
              <input
                class="w-32"
                type="range"
                min="0"
                max="1"
                step="0.01"
                bind:value="{$config.feedback.sounds.volume}"
                disabled="{!$config.feedback.sounds.enabled}"
              />
              <span>{Math.round($config.feedback.sounds.volume * 100)}%</span>
            </div>
          </div>
        </SubSection>

        {#if $config.feedback.sounds.mode === 'custom' && $config.feedback.sounds.enabled}
          <SubSection>
            <span slot="title">{$translations.settings.feedback.sounds.customAudioFile.name}</span>
            <span slot="description">{$translations.settings.feedback.sounds.customAudioFile.description}</span>

            <div slot="content">
              <div class="flex gap-1">
                <Button
                  on:click="{function () {
                    window.electron.send('electron', { event: 'selectAudioFile', data: null });
                  }}"
                >
                  {$translations.settings.feedback.sounds.customAudioFile.select}
                </Button>
                {#if $config.feedback.sounds.file.filepath !== null}
                  <Button
                    on:click="{function () {
                      $config.feedback.sounds.file = {
                        filepath: null,
                        basepath: null,
                        basename: null,
                      };
                    }}"
                    btnType="cancel"
                  >
                    {$translations.buttons.reset}
                  </Button>
                  <Button
                    on:click="{function () {
                      window.electron.send('electron', { event: 'playTest', data: null });
                    }}"
                  >
                    Test
                  </Button>
                {/if}
              </div>
              <span
                >{$translations.settings.feedback.sounds.customAudioFile.selected}:
                <span class="font-light"
                  >{$config.feedback.sounds.file.basename
                    ? $config.feedback.sounds.file.basename
                    : $translations.states.none}</span
                ></span
              >
            </div>
          </SubSection>
        {/if}

        <SubSection>
          <span slot="title">{$translations.settings.feedback.speech.name}</span>
          <span slot="description">{$translations.settings.feedback.speech.description}</span>

          <Select
            slot="content"
            bind:value="{$config.feedback.speech.enabled}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.feedback.volume.name}</span>
          <span slot="description">{$translations.settings.feedback.volume.description}</span>

          <div
            slot="content"
            class="flex gap-1"
          >
            <input
              class="w-32"
              type="range"
              min="0"
              max="1"
              step="0.01"
              bind:value="{$config.feedback.speech.volume}"
              disabled="{!$config.feedback.speech.enabled}"
            />
            <span>{Math.round($config.feedback.speech.volume * 100)}%</span>
          </div>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.feedback.language.name}</span>
          <span slot="description">{$translations.settings.feedback.language.description}</span>

          <Select
            slot="content"
            bind:value="{$config.feedback.language}"
          >
            <Option value="hu">Hungarian</Option>
            <Option value="en">English</Option>
          </Select>
        </SubSection>
      </div>
    </Section>

    <Section>
      <span slot="title">{$translations.settings.speechRecognition.this.name}</span>
      <span slot="description">{$translations.settings.speechRecognition.this.description}</span>

      <div slot="content">
        <SubSection>
          <span slot="title">{$translations.settings.speechRecognition.language.name}</span>
          <span slot="description">{$translations.settings.speechRecognition.language.description}</span>

          <Select
            slot="content"
            bind:value="{$config.speechRecognition.language}"
          >
            <Option value="hu-HU">Hungarian</Option>
            <Option value="en-US">English (USA)</Option>
            <Option value="en-GB">English (UK)</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.speechRecognition.customWordsAndPhrases.name}</span>
          <span slot="description">{$translations.settings.speechRecognition.customWordsAndPhrases.description}</span>

          <WordsPhrasesWindows
            slot="content"
            bind:items="{$config.speechRecognition.customWordsAndPhrases}"
            itemName="customWordsAndPhrases"
          />
        </SubSection>
      </div>
    </Section>

    <Section>
      <span slot="title">{$translations.settings.replacers.this.name}</span>
      <span slot="description">{$translations.settings.replacers.this.description}</span>

      <div slot="content">
        <SubSection>
          <span slot="title">{$translations.settings.replacers.punctuationMarks.name}</span>
          <span slot="description">{$translations.settings.replacers.punctuationMarks.description}</span>

          <Select
            slot="content"
            bind:value="{$config.replacers.punctuationMarks}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.replacers.gameChatPrefixes.name}</span>
          <span slot="description">{$translations.settings.replacers.gameChatPrefixes.description}</span>

          <Select
            slot="content"
            bind:value="{$config.replacers.gameChatPrefixes}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>
      </div>
    </Section>

    <Section>
      <span slot="title">{$translations.settings.windowAllowList.this.name}</span>
      <span slot="description">{$translations.settings.windowAllowList.this.description}</span>

      <div slot="content">
        <SubSection>
          <Select
            slot="content"
            bind:value="{$config.windowAllowList.enabled}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.windowAllowList.windows.name}</span>
          <span slot="description">{$translations.settings.windowAllowList.windows.description}</span>

          <WordsPhrasesWindows
            disabled="{!$config.windowAllowList.enabled}"
            disabledText="{'(' +
              $translations.settings.windowAllowList.this.name +
              ' ' +
              $translations.states.disabled.toLowerCase() +
              ')'}"
            slot="content"
            bind:items="{$config.windowAllowList.windows}"
            itemName="windows"
          />
        </SubSection>
      </div>
    </Section>

    <Section>
      <span slot="title">{$translations.settings.commands.this.name}</span>
      <span slot="description">{$translations.settings.commands.this.description}</span>

      <div
        slot="content"
        class="relative"
      >
        <SubSection>
          <Select
            slot="content"
            bind:value="{$config.commands.enabled}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.commands.prefix.name}</span>
          <span slot="description">{$translations.settings.commands.prefix.description}</span>

          <Input
            slot="content"
            bind:value="{$config.commands.prefix}"
            disabled="{!$config.commands.enabled}"
          />
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.commands.splitter.name}</span>
          <span slot="description">{$translations.settings.commands.splitter.description}</span>

          <Input
            slot="content"
            bind:value="{$config.commands.splitter}"
            disabled="{!$config.commands.enabled}"
          />
        </SubSection>
      </div>
    </Section>

    <Section>
      <span slot="title">{$translations.settings.macros.this.name}</span>
      <span slot="description">{$translations.settings.macros.this.description}</span>

      <div
        slot="content"
        class="relative"
      >
        <SubSection>
          <Select
            slot="content"
            bind:value="{$config.macros.enabled}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.macros.macros.name}</span>
          <span slot="description">{$translations.settings.macros.macros.name}</span>

          <Macros
            slot="content"
            bind:macros="{$macros}"
          />
        </SubSection>
      </div>
    </Section>

    <Section useSplitterLine="{false}">
      <span slot="title">{$translations.settings.others.this.name}</span>
      <span slot="description">{$translations.settings.others.this.description}</span>

      <div slot="content">
        <SubSection>
          <span slot="title">{$translations.settings.others.mtaConsoleInputMode.name}</span>
          <span slot="description">{$translations.settings.others.mtaConsoleInputMode.description}</span>

          <Select
            slot="content"
            bind:value="{$config.others.mtaConsoleInputMode}"
            disabled="{!$config.replacers.gameChatPrefixes}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>

        <SubSection>
          <span slot="title">{$translations.settings.others.showActiveButtons.name}</span>
          <span slot="description">{$translations.settings.others.showActiveButtons.description}</span>

          <Select
            slot="content"
            bind:value="{$config.others.showActiveButtons}"
          >
            <Option value="{true}">{$translations.states.enable}</Option>
            <Option value="{false}">{$translations.states.disable}</Option>
          </Select>
        </SubSection>
      </div>
    </Section>
  </div>
</Layout>
