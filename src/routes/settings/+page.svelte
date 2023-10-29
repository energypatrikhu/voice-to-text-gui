<script lang="ts">
	import Header from '$components/Header.svelte';
	import Layout from '$components/Layout.svelte';
	import { dict } from '$stores/dict';
	import { config } from '$stores/config';
	import Input from '$components/Modal/Input.svelte';
	import Option from '$components/Modal/Option.svelte';
	import Select from '$components/Modal/Select.svelte';
	import Section from '$components/Settings/Section.svelte';
	import SubSection from '$components/Settings/SubSection.svelte';
	import KeyboardShortcuts from '$components/Settings/KeyboardShortcuts.svelte';
	import WordsPhrasesWindows from '$components/Settings/WordsPhrasesWindows.svelte';
</script>

<Header />

<Layout>
	<div class="text-4xl px-4 h-16 border-b border-b-neutral-600 flex items-center">
		<span>{$dict.navigation.settings}</span>
	</div>

	<div class="fixed overflow-hidden overflow-y-scroll w-full h-[calc(100%-64px-48px)] flex flex-col gap-4 px-4 py-2">
		<Section>
			<span slot="title">logs</span>

			<div slot="content">
				<SubSection>
					<span slot="title">debug</span>
					<Select
						slot="content"
						bind:value="{$config.logs.debug}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">saveToFile</span>
					<Select
						slot="content"
						bind:value="{$config.logs.saveToFile}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">input</span>

			<div slot="content">
				<SubSection>
					<span slot="title">holdToActivate</span>
					<Select
						slot="content"
						bind:value="{$config.input.holdToActivate}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">keyboardShortcuts</span>
					<KeyboardShortcuts
						slot="content"
						bind:keyboardShortcuts="{$config.input.keyboardShortcuts}"
					/>
				</SubSection>

				<SubSection>
					<span slot="title">autoRelease</span>
					<Select
						slot="content"
						bind:value="{$config.input.autoRelease.enabled}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">releaseTime</span>
					<Input
						slot="content"
						bind:value="{$config.input.autoRelease.releaseTime}"
						type="number"
						text="ms"
						textPos="after"
					/>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">output</span>

			<div slot="content">
				<SubSection>
					<span slot="title">partial</span>
					<Select
						slot="content"
						bind:value="{$config.output.partial}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">animated</span>
					<Select
						slot="content"
						bind:value="{$config.output.animated}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">typingDelay</span>
					<Input
						bind:value="{$config.output.typingDelay}"
						slot="content"
						type="number"
						text="ms"
						textPos="after"
					/>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">feedback</span>

			<div slot="content">
				<SubSection>
					<span slot="title">sounds</span>
					<span slot="content">WIP</span>
				</SubSection>

				<SubSection>
					<span slot="title">speech</span>
					<Select
						slot="content"
						bind:value="{$config.feedback.speech.enabled}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">volume</span>
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
						/>
						<span>{Math.round($config.feedback.speech.volume * 100)}%</span>
					</div>
				</SubSection>

				<SubSection>
					<span slot="title">language</span>
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
			<span slot="title">speechRecognition</span>

			<div slot="content">
				<SubSection>
					<span slot="title">language</span>
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
					<span slot="title">customWordsAndPhrases</span>
					<WordsPhrasesWindows
						slot="content"
						bind:items="{$config.speechRecognition.customWordsAndPhrases}"
						itemName="customWordsAndPhrases"
					/>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">replacers</span>

			<div slot="content">
				<SubSection>
					<span slot="title">punctuationMarks</span>
					<Select
						slot="content"
						bind:value="{$config.replacers.punctuationMarks}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">gameChatPrefixes</span>
					<Select
						slot="content"
						bind:value="{$config.replacers.gameChatPrefixes}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">windowAllowList</span>

			<div slot="content">
				<SubSection>
					<Select
						slot="content"
						bind:value="{$config.windowAllowList.enabled}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">windows</span>
					<WordsPhrasesWindows
						slot="content"
						bind:items="{$config.windowAllowList.windows}"
						itemName="windows"
					/>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">commands</span>

			<div slot="content">
				<SubSection>
					<Select
						slot="content"
						bind:value="{$config.commands.enabled}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">prefix</span>
					<Input
						slot="content"
						bind:value="{$config.commands.prefix}"
					/>
				</SubSection>

				<SubSection>
					<span slot="title">splitter</span>
					<Input
						slot="content"
						bind:value="{$config.commands.splitter}"
					/>
				</SubSection>
			</div>
		</Section>

		<Section useSplitterLine="{false}">
			<span slot="title">others</span>

			<div slot="content">
				<SubSection>
					<span slot="title">mtaConsoleInputMode</span>
					<Select
						slot="content"
						bind:value="{$config.others.mtaConsoleInputMode}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">showActiveButtons</span>
					<Select
						slot="content"
						bind:value="{$config.others.showActiveButtons}"
					>
						<Option value="{true}">Enable</Option>
						<Option value="{false}">Disable</Option>
					</Select>
				</SubSection>
			</div>
		</Section>
	</div>
</Layout>
