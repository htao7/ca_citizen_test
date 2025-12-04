import { Question } from './types';

// We store the raw text to parse it at runtime. 
// This is more efficient for code maintenance than a 5000 line JSON array in the source code.
const RAW_DATA = `
1. When must a federal election be held according to legislation passed by parliament?
A. When the king wants to replace the prime minister.
B. Within four years of the most recent election.
C. Within 5 years of the last election.
D. The prime minister can call the election any time at his own will.
Answer: B

2. Which of the following is the federal government responsible for?
A. Highways
B. Natural resources
C. Education
D. Interprovincial trade and communications
Answer: D

3. What was the name of the new country formed at confederation?
A. Britain
B. Canada
C. Canadian Confederation
D. Dominion of Canada
Answer: D

4. Where do more than half of the people in Canada live?
A. Coastal Pacific
B. Atlantic Canada
C. Prairies
D. Central Canada
Answer: D

5. Who brought Quebec into confederation?
A. Sir Louis-Hippolyte La Fontaine
B. Sir George-Étienne Cartier
C. Sir Wilfrid Laurier
D. Sir John Alexander Macdonald
Answer: B

6. In World War II, how did Canada contribute more to the Allied air effort than any other Commonwealth country?
A. Trained 130,000 Allied air crew.
B. Deployed paratroopers in France.
C. Provided ammunition.
D. Sent 130,000 soldiers to take France back from the Germans.
Answer: A

7. How can a party in power be defeated in parliament?
A. If there is a revolution.
B. If the king orders the party to resign.
C. If a majority of the MPs vote against a major government decision.
D. If a minority of the MPs vote against a major government decision.
Answer: C

8. Which of the following are the responsibilities of provincial government?
A. Education, health care, natural resources and policing.
B. National defense, healthcare, citizenship, and firefighting.
C. Education, foreign policy, natural resources and policing.
D. National defense, foreign policy, highways, and Aboriginal affairs.
Answer: A

9. What was the Underground Railroad?
A. An anti-slavery network that helped thousands of slaves escape the United States and settle in Canada.
B. A railroad through the Rockies that was mainly through mountain tunnels.
C. A network fur traders used to transport beaver pelts to the United States.
D. The first underground subway tunnel in Toronto.
Answer: A

10. Which region covers more than one-third of Canada?
A. Northern Territories
B. South region
C. North region
D. Southern Territories
Answer: A

11. What is the name of the royal anthem of Canada?
A. Great Canada
B. O Canada
C. God save the queen (or king)
D. O Canada
Answer: C

12. What is the primary role of the police in Canada?
A. To resolve disputes and interpret law.
B. To keep people safe and to enforce the law.
C. To provide national security intelligence to the government.
D. To conduct or support land warfare, peacekeeping, or humanitarian missions.
Answer: B

13. Which province has the most bilingual Canadians?
A. British Columbia
B. Quebec
C. Ontario
D. New Brunswick
Answer: B

14. Which province is one of the most productive agricultural regions in the world?
A. Manitoba
B. Saskatchewan
C. British Columbia
D. Alberta
Answer: B

15. When is Canada Day?
A. November 11th
B. July 1st
C. October 1st
D. July 4th
Answer: B

16. In what year did Canada become a country?
A. 1867
B. 1687
C. 1786
D. 1678
Answer: A

17. The two official languages of Canada are:
A. Inuktitut and English
B. French and Inuktitut
C. English and French
D. Mandarin and English
Answer: C

18. Where is Canada located?
A. Central America
B. Europe
C. North America
D. South America
Answer: C

19. Can you name the five great lakes between Canada and the US?
A. Lake Toronto, Lake Michigan, Lake Mexico, Lake Ontario, Lake St. Louis
B. Lake Superior, Lake Michigan, Lake Huron, Lake Erie, Lake Ontario
C. Lake Michigan, Lake Victoria, Lake Mexico, Lake Ontario, Lake St. Louis
D. None of the above
Answer: B

20. What do you call the king's representative in the provinces?
A. Governor Lieutenant
B. King's Governor
C. Lieutenant Governor
D. Governor General
Answer: C

21. How are members of parliament chosen?
A. Elected by senators
B. Elected by the prime minister
C. Chosen by the king
D. Elected by Canadian citizens
Answer: D

22. In what jobs did the Métis first work with European settlers?
A. Supplies, traders, guides, and interpreters
B. Taking care of children
C. Building housing
D. Fishing
Answer: A

23. What does the National Register of Electors contain?
A. Database of landed immigrants
B. Database of Canadian citizens at least 18 years of age who are qualified to vote in federal elections and referendums
C. Database of all Canadian citizens
D. Database of Canadian taxpayers
Answer: B

24. What was the main advantage of the NAFTA agreement?
A. Free trade among Canada, the USA, and Mexico
B. Free trade between Canada and China
C. Free trade between Canada and the UK
D. Free trade between Canada and Japan
Answer: A

25. Who are the Métis?
A. The distinct Aboriginal people of Atlantic Canada
B. A people of mixed Inuit or First Nations ancestry, most of whom live on the prairies
C. First Nations people speaking the Michif dialect
D. A distinct people of mixed Aboriginal and European ancestry
Answer: D

26. Which act granted for the first time in Canada legislative assemblies elected by the people?
A. The Constitutional Act of 1982
B. The Constitutional Act of 1891
C. The Constitutional Act of 1791
D. The Constitutional Act of 1972
Answer: C

27. Who appoints the judges of the Supreme Court of Canada?
A. The Governor General
B. The Prime Minister
C. Other judges
D. The people
Answer: A

28. What does the crown mean for Canadians?
A. The crown is a symbol of government including parliament, legislatures, courts, police services, and the armed forces
B. The crown contains symbols of England, France, Scotland, and Ireland, as well as red maple leaves
C. A national motto, "A Mari Usque Ad Mare", which in Latin means "from sea to sea"
D. The crown reflects the Greco-Roman heritage of Western civilization in which democracy originated
Answer: A

29. What did the suffrage movement achieve?
A. Quebec experienced an era of rapid change
B. The suffrage movement abolished slavery in Canada
C. The suffrage movement led to the introduction of employment insurance
D. Women achieved the right to vote
Answer: D

30. When did settlers from France first establish communities on the St. Lawrence River?
A. Late 1600s
B. Early 1700s
C. Late 1700s
D. Early 1600s
Answer: D

31. Which region is known as the industrial and manufacturing heartland of Canada?
A. Atlantic provinces
B. Prairie provinces
C. Central Canada
D. West Coast
Answer: C

32. What types of jobs are provided by service industries?
A. Communications and retail services
B. Transportation and education
C. Tourism and government
D. All answers are correct
Answer: D

33. With which words does the Canadian Charter of Rights and Freedoms begin?
A. Canadian citizens have rights and responsibilities
B. O Canada, our home and native land
C. Canada is a free country and home of the brave
D. Whereas Canada is founded upon principles that recognize the supremacy of God and the rule of law
Answer: D

34. Which of the following is not a responsibility of Canadian citizens?
A. Learning to speak both official languages
B. Voting in elections
C. Obeying the law
D. Taking responsibility for oneself and one's family
Answer: A

35. What do Canadians remember on Remembrance Day?
A. Canadian victory in World War I
B. Canadian victory in the Battle of Vimy Ridge
C. Canadian victory in World War II
D. Sacrifices made by Canadian veterans and brave soldiers in wars
Answer: D

36. Why was the Canadian Pacific Railway built?
A. The railway made it possible for immigrants to settle in central Canada
B. British Columbia joined Canada in 1871 after Ottawa promised to build a railway to the west coast
C. To provide a spectacular tourist excursion across precipitous passes and bridges
D. So British Columbia could handle the trade of goods worth billions of dollars all around the world
Answer: B

37. Why is trade with other countries important to Canada?
A. Trade with other countries changed the native way of life forever
B. To increase trade and enjoy one of the world's highest standards of living
C. Canada has become a member of the World Trade Organization
D. The French and Aboriginal people collaborated with Canada in the vast fur trade economy
Answer: B

38. Which of the following best describes the role of the king in Canada?
A. To make important decisions about how the country is governed
B. To peacefully oppose or try to improve government proposals
C. To run the federal government departments
D. To focus on citizenship and allegiance, be a symbol of Canadian sovereignty and a guardian of constitutional freedoms
Answer: D

39. What does it mean to say Canada is a constitutional monarchy?
A. The sovereign queen or king approves bills before they become law
B. The sovereign queen or king represents Canadians in parliament
C. Canada's head of state is a hereditary sovereign queen or king who reigns in accordance with the constitution
D. The sovereign queen or king is the lawmaker of Canada
Answer: C

40. Remembrance Day is celebrated on:
A. July 1st
B. July 4th
C. November 11th
D. November 20th
Answer: C

41. What are the provinces of central Canada?
A. Ontario and Quebec
B. Ontario and Alberta
C. Quebec and New Brunswick
D. Alberta and Saskatchewan
Answer: A

42. Where do the majority of Métis live in Canada?
A. Central Canada
B. The North
C. Prairie provinces
D. The Maritimes
Answer: C

43. Which country is Canada's largest trading partner?
A. China
B. The United States of America
C. The United Kingdom
D. Mexico
Answer: B

44. Which two fundamental freedoms are protected by the Canadian Charter of Rights and Freedoms?
A. Freedom of Belief and Freedom of Religion
B. Equal employment rights and opportunities
C. Basic living rights and obey laws
D. Aboriginal people's rights and to volunteer
Answer: A

45. What do the initials MP stand for in Canadian politics?
A. Member of Parliament
B. Minister of Parliament
C. Member of the Patriots
D. Master of the province
Answer: A

46. Which was the last province to join Canada?
A. Prince Edward Island
B. Manitoba
C. Newfoundland
D. Yukon
Answer: C

47. Who are the Aboriginal peoples in Canada?
A. The first settlers of Newfoundland
B. The first European settlers to arrive in Canada
C. The descendants of the first Australian immigrants to Canada
D. The first inhabitants of Canada
Answer: D

48. What does the term responsible government mean?
A. Each person in each electoral district is responsible for voting
B. The governor general is responsible for the actions of the prime minister
C. The ministers of the crown must have the support of a majority of the elected representatives in order to govern
D. All Canadians are responsible for each other
Answer: C

49. Which province is Canada's main producer of pulp and paper?
A. Quebec
B. British Columbia
C. Saskatchewan
D. Ontario
Answer: A

50. What should you do if you do not receive a voter information card before an election?
A. Call your local municipality
B. Turn up at your nearest polling station on election day
C. You should assume you were not chosen to vote
D. Contact Elections Canada
Answer: D

51. What are the parties that are not in power called?
A. Tea parties
B. Opposition parties
C. Rival parties
D. Opponent parties
Answer: B

52. Which of the following is the oldest colony of the British Empire in Canada?
A. Quebec
B. Ontario
C. Alberta
D. Newfoundland and Labrador
Answer: D

53. Who is the king's representative in Canada?
A. The Premier
B. The Prime Minister's spouse
C. The Governor General of Canada
D. The Prime Minister
Answer: C

54. Which of the following are the responsibilities of Canadian citizenship?
A. Protect the Canadian environment and vote in elections
B. Obey the law, find work in the government, and serve in the Canadian Army
C. Serve in the Canadian Army, obey the law, and take responsibility for oneself and one's family
D. Obey the law, serve on a jury, vote in elections, and help others in the community
Answer: D

55. Which region of Canada is known for its fertile agricultural land and energy resources?
A. Central Canada
B. Quebec
C. Prairie Provinces
D. Maritime Provinces
Answer: C

56. Why are the Great Lakes important to Canada?
A. They provide water for irrigation
B. They provide fresh water and waterways
C. They provide waterways
D. They are tourist attractions
Answer: B

57. Which province in Canada is the smallest in land size?
A. British Columbia
B. Prince Edward Island
C. Alberta
D. New Brunswick
Answer: B

58. Who was the first person to draw a map of Canada's east coast?
A. Jean Talon
B. George Cartier
C. John Cabot (John Kat in transcript)
D. Jacques Cartier
Answer: C

59. If you cannot pay for a lawyer, how can you get legal help?
A. Borrow money from the government and pay for the lawyer
B. Go to legal aid services in most communities
C. Apply for financial aid from the government to pay for legal fees
D. Do not go to a court
Answer: B

60. What is a polling station?
A. Place where you vote
B. Campaign offices for candidates
C. Place where the number of votes is counted
D. Member of parliament's constituency
Answer: A

61. What is a cabinet minister?
A. Candidate picked by the prime minister
B. MP picked by the premier of each province
C. MP selected by the prime minister to run federal departments
D. MP selected by the king to make laws
Answer: C

62. Who discovered insulin?
A. Dr. Wilder Penfield
B. Matthew Evans and Henry Woodward
C. Sir Frederick Banting and Charles Best
D. Dr. John A. Hopps
Answer: C

63. What is a major river in Quebec?
A. Hudson's Bay
B. Niagara
C. Fraser River
D. St. Lawrence River
Answer: D

64. Who circled the globe in a wheelchair to raise funds for spinal cord research?
A. Reginald Fessenden
B. Rick Hansen
C. Terry Fox
D. Gerhard Herzberg
Answer: B

65. Who is the father of Manitoba and defender of Métis rights?
A. Louis Riel
B. Sir Louis-Hippolyte La Fontaine
C. Sir John Alexander Macdonald
D. Sir William Riel
Answer: A

66. Which of the following is a non-Canadian not allowed to do?
A. Leave the country at will
B. Contact his or her MP
C. Take the Canada citizenship test
D. Vote in federal and provincial elections
Answer: D

67. Why is the north sometimes called the land of the midnight sun?
A. It is closer to the sun
B. The northern lights appear at midnight
C. It is night most of the time
D. Summer daylight can last up to 24 hours
Answer: D

68. One-third of all Canadians live in:
A. Saskatchewan
B. Quebec
C. Alberta
D. Ontario
Answer: D

69. Who can ask you about whom you voted for?
A. No one
B. Any other Canadian
C. Your local MP
D. The prime minister
Answer: A

70. When did the United Empire loyalists come to Canada?
A. Late 1600s
B. Early 1600s
C. Early 1700s
D. Late 1700s
Answer: D

71. What happens when the federal government loses a confidence vote?
A. An election is called
B. The official opposition party takes power
C. The prime minister loses his job
D. The prime minister is no longer the leader of his party
Answer: A

72. What happened at the Battle of the Plains of Abraham?
A. The Voyagers battled with the British for fur trading rights
B. Americans fought the United Empire loyalists during the American Revolution
C. The British defeated the French, marking the end of France's empire in America
D. The French defeated the British in a battle for Quebec
Answer: C

73. Who has the right to apply for a Canadian passport?
A. British citizens
B. Canadian citizens
C. Any immigrant who has stayed a minimum of 3 years in Canada
D. Wealthy citizens
Answer: B

74. Who were the group of seven in modern Canada?
A. A group of politicians
B. A group of Canadian companies
C. A group of cowboys who defended Canada
D. A group of Canadian landscape painters in the 1920s
Answer: D

75. What is a responsible government?
A. The government is responsible for the well-being of its people
B. The government must take responsibility for any act of war it decides to commit
C. A government that is against corruption
D. The government must resign if it loses a confidence vote in the assembly
Answer: D

76. What outcome and significance did the War of 1812 with the USA have for Canada?
A. Canada formed part of the United States
B. Canada lost a lot of people in the war
C. Canada protected its independence from the United States
D. Canada became an independent country
Answer: C

77. What level of government passes bylaws?
A. Provincial
B. Municipal or local government
C. Federal
D. Senators
Answer: B

78. What is the meaning of the Canadian coat of arms and motto: "A Mari Usque Ad Mare"?
A. From air to land
B. From sea to land
C. From land to sea
D. From sea to sea
Answer: D

79. What are three key facts about Canada's system of government?
A. A federal kingdom, a parliamentary democracy, and a constitutional monarchy
B. A federal state, a parliamentary democracy, and a constitutional monarchy
C. A socialist country, a parliamentary democracy, and a constitutional monarchy
D. A federal country, a constitutional democracy, and a parliamentary monarchy
Answer: B

80. In which type of industry did most early European settlers work?
A. Fur trading
B. Oil
C. Gold mining
D. Hunting
Answer: A

81. How is a cabinet minister chosen?
A. By the prime minister
B. By the king
C. By the voters
D. By the senators
Answer: A

82. Who are the Acadians?
A. English-speaking refugees who settled in Ontario
B. The descendants of French colonists who began settling in what are now the Maritime Provinces in 1604
C. French-speaking Catholics who live in Ontario
D. Aboriginal people of the Arctic
Answer: B

83. How is the prime minister chosen?
A. The MPs vote on the prime minister
B. The governor general with the senators appoints the prime minister
C. The king appoints the prime minister
D. The leader of the party with the most elected members of parliament
Answer: D

84. What does MNA stand for?
A. Member of the national aid
B. Member of the national association
C. Member of the national airline
D. Member of the National Assembly
Answer: D

85. The amended Constitution of Canada in 1982 was proclaimed by:
A. The Senate
B. Queen Elizabeth II
C. The people of Canada
D. The Prime Minister
Answer: B

86. What is Canada's system of government called?
A. Dictatorship
B. Parliamentary government
C. Military rule
D. Communism
Answer: B

87. What are the colors present in the Canadian flag?
A. Blue and white
B. Red and white
C. Green and white
D. Red and blue
Answer: B

88. From where did the first European settlers in Canada come?
A. Germany
B. England
C. France
D. Iceland
Answer: C

89. Which of the following are not responsibilities of the Governor General?
A. Chooses the opposition party
B. Performs the ceremonial duties of the head of state
C. Signs bills to make them law after they have been passed by parliament
D. A and C
Answer: A

90. How can you contact your member of Parliament?
A. By using social media sites online
B. By writing a letter to the House of Commons
C. By booking an appointment over the phone
D. By waiting outside of the Parliament building
Answer: B

91. Who was Sir George-Étienne Cartier?
A. A railway lawyer and Montrealer
B. The first French Canadian prime minister
C. The first head of a responsible government
D. Canada's first prime minister
Answer: A

92. Who is the greatest Canadian hockey player?
A. Wayne Gretzky
B. Mark Tewksbury
C. Donovan Bailey
D. Terry Fox
Answer: A

93. Which of the following answers is not true about the relationship between Canada and the USA?
A. Canada and the USA share the longest undefended international border
B. Canada and the USA are the largest trading partners in the world
C. Canada exports very few goods to the USA
D. The relationship between Canada and the USA is the closest and the most extensive in the world
Answer: C

94. On which principles is Canada's constitution based?
A. Multiculturalism, peace and order
B. Peace, order, and good government
C. War, order, and good government
D. Mobility rights, order, and good government
Answer: B

95. What is the significance of hockey?
A. It is the national summer sport
B. It is the most popular spectator sport in Canada and also its national winter sport
C. Canada won a gold medal in 2008's Olympics in this event
D. None of these
Answer: B

96. What are the two principles upon which Canada is founded?
A. The supremacy of God and the rule of law
B. The supremacy of God and freedom of speech
C. The supremacy of law and the rule of God
D. Mobility right and the rule of law
Answer: A

97. What is celebrated on the 26th of December?
A. Remembrance Day
B. Victoria Day
C. Boxing Day
D. Canada Day
Answer: C

98. Since when has the protocol for the amendment of the Canadian Constitution existed?
A. 1962
B. 1982
C. 1885
D. 1972
Answer: B

99. Canada's national winter sport is:
A. Lacrosse
B. Basketball
C. Hockey
D. Golf
Answer: C

100. Who led an armed uprising and seized Fort Garry?
A. John Alexander Macdonald
B. Louis Riel
C. Sam Steele
D. George-Étienne Cartier
Answer: B

101. What are the main functions of the cabinet?
A. Natural resources
B. Navigation
C. To prepare the budget and propose new laws to be implemented
D. Defense
Answer: C

102. Who can enter and leave the country freely without time constraints?
A. Canadian citizens and landed immigrants
B. Commonwealth citizens
C. Canadian citizens
D. British citizens
Answer: C

103. If the government loses a confidence vote in the assembly, it must:
A. Call for by-elections
B. Continue governing
C. Do nothing
D. Resign
Answer: D

104. Which province was the first to grant voting rights to women?
A. Quebec
B. Ontario
C. Nova Scotia
D. Manitoba
Answer: D

105. What is the great charter of freedom also known as?
A. Habeas Corpus
B. Dominion of Canada
C. Canadian Constitution
D. Magna Carta
Answer: D

106. A member of Parliament from Montreal announces that she will spend her weekend in her electoral district. This means she would be:
A. In her office on Parliament Hill
B. In some part of Montreal where she was elected
C. Visiting the province of Quebec
D. Going on a vacation
Answer: B

107. How is the government formed after a federal election?
A. Each province elects one representative to form the government. The king then chooses the prime minister.
B. The governor general picks a party and a prime minister to run the government.
C. The party with the most elected representatives becomes the party in power. The leader of this party becomes the prime minister.
D. The party with the most elected representatives becomes the party in power. The king chooses the prime minister from this party.
Answer: C

108. Who is Canada's head of state?
A. The premier of Canada
B. A hereditary sovereign, queen or king
C. The governor general
D. The prime minister
Answer: B

109. Who chose Ottawa as the capital of Canada?
A. Queen Elizabeth I
B. Queen Elizabeth II
C. Queen Victoria
D. Queen Anne
Answer: C

110. When was the current flag of Canada raised for the first time?
A. 1921
B. 1965
C. 1949
D. 1892
Answer: B

111. What are the prime minister and cabinet ministers together called?
A. The government
B. The cabinet
C. The House of Commons
D. The Senate
Answer: B

112. In which province are more than half of Canada's aeronautics and space industry located?
A. Saskatchewan
B. Ontario
C. Quebec
D. Manitoba
Answer: C

113. Who is General Sir Arthur Currie?
A. Canada's greatest soldier in the First World War
B. A great frontier hero
C. An explorer of Western Canada
D. A military leader of the Métis in the 19th century
Answer: A

114. Which province was split into two at Confederation?
A. Lower Canada
B. Newfoundland
C. Upper Canada
D. The Province of Canada
Answer: D

115. What are the territories of Northern Canada and their capital cities?
A. Yukon (Whitehorse), Northwest Territories (Yellowknife), and Nunavut (Iqaluit)
B. Northwest Territories (Yellowknife) and Alaska (Juneau)
C. Northwest Territories (Yellowknife)
D. Alaska (Juneau) and Yukon (Whitehorse)
Answer: A

116. What does the word Inuit mean?
A. Eskimo in the Inuktitut language
B. Home in English
C. "The people" in the Inuktitut language
D. The Arctic land in the Inuktitut language
Answer: C

117. Which party becomes the official opposition?
A. The party the prime minister selects
B. The party with the least votes
C. The party with the second most votes
D. Any independent candidate
Answer: C

118. Who played an important part in building the Canadian Pacific Railway?
A. Acadian railroad workers
B. Afro-American slaves
C. American railroad engineers
D. Chinese railroad workers
Answer: D

119. Which provinces are connected to Ontario by land?
A. New Brunswick and Quebec
B. Alberta and Quebec
C. Manitoba and Quebec
D. Manitoba and Alberta
Answer: C

120. Who do members of parliament represent?
A. Everyone who lives in his or her electoral district
B. Everyone who lives in his or her neighborhood
C. Everyone who lives in his or her province
D. Everyone in northern Canada
Answer: A

121. What is the role of the opposition parties?
A. To ensure reports about the current government are sent to the king
B. To supervise the government
C. To oppose or try to improve government proposals
D. To regulate government proposals
Answer: C

122. On what date did Nunavut become a territory?
A. April 1st, 1999
B. May 1st, 1998
C. July 1st, 1867
D. July 31st, 1820
Answer: A

123. Why is the British North America Act important in Canadian history?
A. It was agreed to by the First Nations and Inuit
B. It was written by the British government
C. The Aboriginal people signed the act
D. It made confederation legal
Answer: D

124. Which of the following statements accurately describes the Quebec flag known as the Fleur-de-lis?
A. It features a white cross with four roses in its quadrants and was adopted in 1948
B. It features a white cross with four fleur-de-lis in its quadrants and was adopted in 1948
C. It features a blue cross with four thistles and shamrocks and was adopted in 1948
D. It features a white cross with four fleur-de-lis and was adopted in 1867
Answer: B

125. Who built the French empire in North America?
A. King Charles II
B. Jean Talon, Bishop Laval, and Count Frontenac
C. Pierre Le Moyne and Sieur d'Iberville
D. Great Britain
Answer: B

126. Which province is on the Pacific coast of Canada?
A. Nova Scotia
B. Alberta
C. New Brunswick
D. British Columbia
Answer: D

127. How many Great Lakes are located between Ontario and the United States?
A. 4
B. 5
C. 6
D. 7
Answer: B

128. Which one is Canada's best known symbol and national police force?
A. RCMP (Royal Canadian Mounted Police)
B. CIA
C. Canadian police
D. RCMP
Answer: D

129. Which group of Aboriginal peoples has the largest population in the Northern Territories and Nunavut?
A. Acadians
B. Métis
C. First Nations
D. Inuit
Answer: D

130. Where are the Parliament buildings located?
A. Toronto
B. Kingston
C. London
D. Ottawa
Answer: D

131. What forms a jury?
A. Politicians
B. Immigrants
C. Judges
D. Citizens
Answer: D

132. What is the significance of the Quebec Act of 1774?
A. It allowed Quebec to gain independence
B. It allowed the French to move into Quebec
C. Canada's tolerance of religious tradition under the law
D. It gave the French more power
Answer: C

133. Who has the right to be considered first for a job in the federal government?
A. Canadian citizens
B. Anyone with the relevant experience
C. Anyone with the necessary qualifications
D. Foreigners
Answer: A

134. Who are Anglophones?
A. People who were taught English at school
B. People who understand but do not speak English
C. People who do not speak English as a first language
D. People who speak English as a first language
Answer: D

135. Who were the voyageurs?
A. Montreal-based traders who traveled by canoe
B. Immigrants to Canada in the 18th century
C. Explorers searching for the Northwest Passage
D. Geographers who first charted the coastline of British Columbia
Answer: A

136. Which countries fought in the Battle of the Plains of Abraham?
A. British and German
B. British and French
C. France and China
D. America and British
Answer: B

137. When did the Canadian Charter of Rights and Freedoms become part of the Constitution?
A. 1892
B. 1872
C. 1982
D. 1782
Answer: C

138. Which group of Aboriginal peoples has the largest population in Canada?
A. Acadians
B. First Nations
C. Indigenous peoples
D. Métis
Answer: B

139. Why is the Constitution Act of 1982 important in Canadian history?
A. Canada can modify the Constitution without the approval from the British government
B. The Queen or King has more power in Canadian government
C. It lets Canadians enjoy more freedom
D. It made changes to the Citizenship Act
Answer: A

140. Which province has the most valuable forest industry in Canada?
A. Ontario
B. Alberta
C. Quebec
D. British Columbia
Answer: D

141. Which of the following best describes the sport of lacrosse?
A. The official winter sport
B. The second most popular sport in Canada
C. The official summer sport
D. The most popular sport in Canada
Answer: C

142. What do you call a law before it is passed?
A. A proposed law
B. A bill
C. A new law
D. A proposal of a law
Answer: B

143. Who among these is a Nobel Prize-winning scientist?
A. Gerhard Herzberg
B. Marshall McLuhan
C. Alexander Graham Bell
D. Harold Innis
Answer: A

144. Canadians have rights and fundamental freedoms such as:
A. Thought and belief
B. Opinion and expression
C. Freedom of religion
D. All of the above
Answer: D

145. When did the British North America Act come into effect?
A. 1867
B. 1881
C. 1901
D. 1876
Answer: A

146. What is the highest honor available to Canadians?
A. The Queen's Medal
B. Elizabeth Cross
C. Victoria Medal
D. Victoria Cross
Answer: D

147. Which city provides important shipping and air links across the Pacific Ocean?
A. Victoria
B. Calgary
C. Edmonton
D. Vancouver
Answer: D

148. What is Terry Fox's contribution?
A. He inspired people to contribute money for cancer research
B. He was the greatest hockey player in Canada
C. His discovery of insulin saves millions of people's lives
D. He was a brilliant soldier
Answer: A

149. What are three minerals still mined in the territories today?
A. Lead, gold, and zinc
B. Silver, lead, and zinc
C. Zinc, gold, and bronze
D. Zinc, lead, and aluminum
Answer: A

150. What are the regions of Canada?
A. West, North, South, East, and Central
B. West Coast, Central, East, Canadian Shield, and South
C. Atlantic, North, Central, Prairies, and West Coast
D. Rockies, Ontario, Quebec, and Prairies
Answer: C

151. What is the head of the city called?
A. Mayor
B. Counselor
C. Alderman
D. Premier
Answer: A

152. In what sorts of jobs do most Canadians work?
A. Service
B. Lumbering
C. Farming
D. Natural resources
Answer: A

153. What is written on an election ballot?
A. The names of the candidates in your election district
B. Who you should vote for
C. The date and time you are allowed to vote
D. Where you should vote
Answer: A

154. Which province is the only officially bilingual province?
A. Ontario
B. Quebec
C. Nova Scotia
D. New Brunswick
Answer: D

155. Where do most French-speaking Canadians live?
A. Nova Scotia
B. Quebec
C. Ontario
D. New Brunswick
Answer: B

156. Who started the women's suffrage movement in Canada?
A. Agnes Macphail
B. Laura Secord
C. Dr. Emily Stowe
D. Madeleine Parent
Answer: C

157. What will you promise when you take the oath of citizenship?
A. Carry out responsibilities as a Canadian citizen
B. Pledge allegiance to the Queen or King
C. Promise to obey the Constitution of Canada
D. Pledge loyalty to the Queen or King, observe the laws, and fulfill the duties of a Canadian
Answer: D

158. The Quebec Act of 1774:
A. Allowed religious freedom for Catholics
B. Is one of the constitutional foundations of Canada
C. Permitted Catholics to hold public office
D. All of the above
Answer: D

159. What region is called the land of the midnight sun?
A. Central Canada
B. The Northern Territories
C. The Prairies
D. The Maritimes
Answer: B

160. What does it mean for a political party to be in power?
A. To gain the approval of the queen or king
B. To have the most elected representatives
C. To generate electricity
D. To hold the nuclear button
Answer: B

161. Which two provinces produce more than 3/4 of Canadian manufactured goods?
A. Quebec and Manitoba
B. British Columbia and Ontario
C. Ontario and Quebec
D. Alberta and Ontario
Answer: C

162. Give an example of how you can demonstrate responsibility by being involved in your community.
A. Minding your own business
B. Throwing a party
C. Keeping your property well-maintained
D. Volunteering
Answer: D

163. To which of the following communities do the majority of Canadians belong?
A. Christian
B. Jewish
C. Muslim
D. Hindu
Answer: A

164. Which Canadian province is the largest producer of oil and natural gas?
A. Quebec
B. Nova Scotia
C. Ontario
D. Alberta
Answer: D

165. Which is the northeastern province in Canada that has its own time zone?
A. Alberta
B. Newfoundland and Labrador
C. Nova Scotia
D. Prince Edward Island
Answer: B

166. What is the voting procedure in Canada?
A. Whichever way you like
B. Online
C. Secret ballot
D. Open ballot
Answer: C

167. Which is the Canadian province with the largest population?
A. Ontario
B. Quebec
C. Nova Scotia
D. Alberta
Answer: A

168. What do Canadians normally wear on Remembrance Day?
A. A red poppy
B. A green shirt
C. A black tie
D. A white shirt
Answer: A

169. What does CPR stand for?
A. Canadian Pacific Railway
B. Canadian People Railway
C. Canadian Public Road
D. Canadian People Resource
Answer: A

170. How long is the Lieutenant Governor appointed for?
A. 3 years
B. 4 years
C. 5 years
D. 6 years
Answer: C

171. What is the fundamental characteristic of Canadian heritage and identity?
A. Multiculturalism
B. French culture
C. Canadian festivals
D. English culture
Answer: A

172. When does Canada celebrate Thanksgiving?
A. The second Monday of October
B. The first Friday of October
C. The 1st Monday of September
D. The first Monday of July
Answer: A

173. What is the symbol of the Canadian government?
A. The Parliament
B. The Crown
C. The National Flag
D. The Snowbirds
Answer: B

174. In the 1960s, Quebec experienced an era of rapid change. What is it called?
A. The East Movement
B. The Quiet Revolution
C. The Suffrage Movement
D. The Industrial Revolution
Answer: B

175. Who invented the worldwide system of standard time zones?
A. Joseph-Armand Bombardier
B. Reginald Fessenden
C. Sir Sandford Fleming
D. Alexander Graham Bell
Answer: C

176. The ancestors of the Aboriginals are believed to have migrated from which of the following continents?
A. Asia
B. America
C. Europe
D. Australia
Answer: A

177. The municipal government is responsible for which of the following?
A. Natural resources
B. Currency
C. Garbage removal
D. Highways
Answer: C

178. Who is a premier?
A. The prime minister is also called the premier
B. A premier has a role similar to that of the prime minister in a federal government (but at a provincial level)
C. The commissioner
D. The governor general
Answer: B

179. Which oceans line Canada's frontiers?
A. The Pacific Ocean in the west
B. The Atlantic Ocean in the east
C. The Arctic Ocean to the north
D. All of the above
Answer: D

180. Who is the head of the government in Canada?
A. The sovereign
B. The prime minister
C. The premier
D. The commissioner
Answer: B

181. What do we need to bring with us for voting?
A. Voter information card, voter's identity, and address proof
B. Credit card
C. Ballot paper
D. None of these
Answer: A

182. Where have most immigrants come from since the 1970s?
A. Asia
B. England
C. France
D. USA
Answer: A

183. For what product did the first companies formed in Canada compete?
A. Timber trade
B. Gold trade
C. Fur trade
D. Fish trade
Answer: C

184. How many Canadians were killed in World War I from 1914 to 1918?
A. 60,000
B. 170,000
C. 200,000
D. 70,000
Answer: A

185. How many Canadians have been awarded the Victoria Cross?
A. 96
B. 500
C. 2
D. 1,222
Answer: A

186. Which country was liberated by the Canadian Army in 1944-1945?
A. Germany
B. Austria
C. The Netherlands
D. Japan
Answer: C

187. Who is known as the greatest living Canadian?
A. Dr. Wilder Penfield
B. Terry Fox
C. Sir John Alexander Macdonald
D. Sir Sandford Fleming
Answer: A

188. Which province has the largest population of Aboriginals?
A. Manitoba
B. Ontario
C. Nova Scotia
D. Alberta
Answer: A

189. How large is Canada?
A. About 8 million km²
B. About 10 million km²
C. About 11 million km²
D. About 9 million km²
Answer: B

190. Where is the most important harbor in Eastern Canada located?
A. Vancouver
B. Yellowknife
C. Halifax
D. Quebec
Answer: C

191. Who is considered Canada's greatest soldier?
A. General Sir Arthur Currie
B. Phil Edwards
C. Sir John Alexander Macdonald
D. Rick Hansen
Answer: A

192. What three oceans border Canada?
A. Hudson, Pacific, and Atlantic
B. Atlantic, Arctic, and Bering
C. Pacific, Indian, and Atlantic
D. Atlantic, Arctic, and Pacific
Answer: D

193. In which act are the responsibilities of the federal and provincial government defined?
A. The Federal Act
B. The Government Act
C. The Responsibilities Act
D. The Constitution Act
Answer: D

194. Which courts are for civil cases involving small sums of money?
A. The Federal Court
B. The Small Claims Courts
C. A Trial Court
D. A Provincial Court
Answer: B

195. What is a voter information card?
A. A list that tells you who the candidates are in your electoral district
B. A letter that lets you know the voting schedule
C. A form that tells you where and when to vote
D. A card to let you register for voting
Answer: C

196. What is the head tax?
A. Race-based entry fee charged for Chinese entering Canada
B. Fee charged for anyone entering Canada after 1900
C. A tax imposed on beer beginning in 1867
D. Fee charged for moving westward in the early 1900s
Answer: A

197. Which of the following are the responsibilities of the federal government?
A. National Defense, Foreign Policy, International Trade, and Aboriginal Affairs
B. National Defense, Healthcare, International Trade, and Aboriginal Affairs
C. Highways, Policing, International Trade, and Criminal Justice
D. Education, Foreign Policy, Recycling Programs, and Aboriginal Affairs
Answer: A

198. In Canada's justice system, what does presumption of innocence mean?
A. The prime minister can determine who is innocent in a court
B. Everybody is guilty until proven innocent
C. Everyone is innocent until proven guilty
D. The judge can determine who is guilty without evidence
Answer: C

199. What does the register of electors contain?
A. A list of all Canadian citizens who are qualified to vote in federal elections and referendums
B. A list of people who are willing to vote in elections and referendums
C. A list of people who voted for the opposition party in the previous election
D. A list of people who are not allowed to vote
Answer: A

200. In the Canadian justice system, what are the roles of the courts and the police?
A. The courts make laws and the police enforce them
B. The courts enforce federal laws and the police enforce provincial laws
C. The courts enforce laws and the police settle disputes
D. The courts settle disputes and the police enforce the laws
Answer: D

201. What is the reason behind the Canada and US border?
A. To improve security
B. To maintain distance
C. Canada wishes to remain independent of the United States
D. To prevent war between the two countries
Answer: C

202. What is the other name for a trial court?
A. The Court of Queen's Bench
B. The Federal Court
C. The Provincial Court
D. The Small Claims Court
Answer: A

203. What is the minimum age for voting in federal, provincial, territorial, and municipal elections?
A. 16
B. 18
C. 19
D. 21
Answer: B

204. What is the tenure of the Governor General?
A. 4 years
B. 5 years
C. 6 years
D. 7 years
Answer: B

205. Postwar, Canada became a more flexible and open society. Which of the following was this based on?
A. Equality of men and women
B. Inequality of women
C. Inequality of men and women
D. Equality of men
Answer: A

206. Which three rights are included in the Canadian Charter of Rights and Freedoms?
A. Freedom of expression rights, property rights, and fair trial rights
B. Mobility rights, Aboriginal people's rights, and official language rights
C. Aboriginal people's rights, voting rights, and official language rights
D. Employment rights, mobility rights, and freedom rights
Answer: B

207. Which of the following are the three founding peoples of Canada?
A. American, French, and British
B. Aboriginal, French, and British
C. French, American, and Indian
D. British, American, and Aboriginal
Answer: B

208. To what ocean is Newfoundland closest?
A. Atlantic
B. Pacific
C. Labrador Sea
D. Arctic
Answer: A

209. What UN operation did Canada participate in from 1950 to 1953?
A. Canadian forces defended Hong Kong
B. The Canadian Corps captured Vimy Ridge
C. Canada participated in the UN operation defending South Korea in the Korean War
D. Canadians volunteered to fight in the South African war
Answer: C

210. From whom are the Acadians descended?
A. Métis and Inuit
B. First Nations who began settling in what are now the Prairie Provinces in 1600s
C. British colonists who began settling in what are now the Maritime Provinces in 1604
D. French colonists who began settling in what are now the Maritime Provinces in 1604
Answer: D

211. Who has the right to enter and leave Canada at will?
A. Prisoners
B. Members of the Commonwealth
C. Canadian citizens
D. Job seekers
Answer: C

212. What was the significance of June 6th, 1944 invasion of Normandy?
A. Canadians made a significant contribution to the defeat of Nazism and fascism in Europe during the Second World War
B. It liberated North Africa from Nazi occupation
C. It results in the forcible relocation of Canadians of Japanese origin
D. It led to the establishment of the Juno Awards
Answer: A

213. What does equality under the law mean?
A. To be protected against any discrimination
B. To be discriminated against
C. To be like anyone else in Canada
D. To be the same as anywhere in the world
Answer: A

214. What does mobility rights mean?
A. Being able to use any mobile phone service in Canada
B. Being able to live and work anywhere in Canada
C. Being able to live and fish anywhere in Canada
D. Being able to play hockey anywhere in Canada
Answer: B

215. What is the Okanagan Valley famous for?
A. Coal mines
B. Lakes and fishing
C. Fruit orchards
D. Sunrise and sunset
Answer: C

216. When did the name of Canada begin appearing on maps?
A. By the 1750s
B. By the 1580s
C. By the 1550s
D. By the 1650s
Answer: C

217. What is a minority government?
A. The party in power holds less than half of the seats in the House of Commons
B. The party in power holds less than half of the seats in the House of Commons and the Senate
C. The party in power holds at least half of the seats in the House of Commons
D. The party in power holds at least half of the seats in the Senate
Answer: A

218. Where are the Great Lakes?
A. Atlantic Canada
B. Manitoba
C. Between Ontario and the United States
D. Northern Quebec
Answer: C

219. What is the difference between the role of the sovereign and that of the prime minister?
A. The sovereign links Canada to 52 other nations and the prime minister is the guardian of constitutional freedoms
B. The sovereign is the symbol of Canadian sovereignty and the prime minister is his aide
C. The sovereign is head of state. The prime minister oversees provincial policies
D. The sovereign is the guardian of constitutional freedoms. The prime minister selects the cabinet ministers and is responsible for operations and policy of government
Answer: D

220. What is the meaning of the remembrance day poppy?
A. To remember our sovereign Queen Elizabeth II
B. To remember the sacrifice of Canadians who have served or died in wars up to the present day
C. To honor prime ministers who have died
D. To celebrate Confederation
Answer: B

221. You can vote in advance if:
A. You are elderly
B. You know you will not be able to vote on election day
C. Sick and physically disabled
D. All of the above
Answer: D

222. Who signs the bills if it is approved by the provincial parliament?
A. The Mayor
B. The Premier
C. The members of the provincial parliament
D. The Lieutenant Governor
Answer: D

223. What does MPP stand for?
A. Member of the provincial parachute
B. Member of the provincial police
C. Member of the Provincial Parliament
D. Member of the provincial publication
Answer: C

224. How are senators chosen?
A. By the premier of all provinces
B. By the governor general of Canada
C. Appointed by the governor general on the advice of the prime minister
D. Appointed by the king
Answer: C

225. Who was the first prime minister of Canada?
A. Sir John Alexander Macdonald
B. Alexander Mackenzie
C. Pierre Elliott Trudeau
D. Sir John Macdonald
Answer: A

226. Which animal is an official symbol of Canada?
A. The bear
B. The moose
C. The beaver
D. The snowbird
Answer: C

227. What do you mark on a federal election ballot?
A. A check mark
B. An X
C. A sticker
D. A thumbprint
Answer: B

228. What does the blindfolded Lady Justice symbolize?
A. Blind to all considerations other than facts
B. The government must respect all of the legal rights a person is entitled to under the law
C. Our judicial system is founded on the presumption of innocence in criminal matters
D. None of these
Answer: A

229. When did thousands of miners first come to the Yukon?
A. 1870s
B. 1980s
C. 1780s
D. 1890s
Answer: D

230. When is Sir Wilfrid Laurier Day celebrated?
A. 12th of November
B. 20th of November
C. 22nd of November
D. 2nd of November
Answer: B

231. What is the significance of the Canadian discovery of insulin?
A. It saved lives of children with sickness
B. It saved millions of lives of people with diabetes
C. It helped the treatment of heart diseases
D. It was an important medicine to save soldiers' lives during World War II
Answer: B

232. Jurisdiction is shared by federal government and provinces over which of the following sectors?
A. Agriculture and immigration
B. Interprovincial trade and communications
C. Defense and health
D. Natural resources
Answer: A

233. What do you call the king's representative in the territories?
A. Commissioner
B. Member of the Legislative Assembly
C. Sir
D. Lieutenant Governor
Answer: A

234. What are the provinces of the Atlantic region?
A. Newfoundland, Nova Scotia, New Brunswick, and Quebec
B. Nova Scotia, New Brunswick, Prince Edward Island, and Quebec
C. Nova Scotia, Newfoundland, New Brunswick, and Prince Edward Island
D. New Brunswick, Nova Scotia, Ontario, and Quebec
Answer: C

235. Why is the Battle of Vimy Ridge important in Canadian history?
A. It was the last battle of the First World War
B. It has come to symbolize Canada's becoming as a nation
C. It was an important victory in the Boer War
D. Out of it was formed the Canadian Corps
Answer: B

236. From where does the name Canada come?
A. From the Inuit word Canada meaning nations
B. From Kanata, the First Nations word for village
C. From the Inuit word meaning home
D. From the First Nations word meaning land
Answer: B

237. What are the three main types of industry in Canada?
A. Natural resources, manufacturing, and services
B. Mining services and manufacturing
C. Oil, tourism, and manufacturing
D. Fishery, tourism, and services
Answer: A

238. Which country lies on Canada's southern border?
A. Central America
B. Mexico
C. Michigan
D. United States of America
Answer: D

239. What are the prairie provinces?
A. Saskatchewan and Manitoba
B. Alberta, Manitoba, and British Columbia
C. Saskatchewan, Alberta, and Manitoba
D. Saskatchewan and Alberta
Answer: C

240. Where do English and French have equal status in Canada?
A. In the workplace
B. In schools
C. In the Parliament of Canada
D. At the city hall
Answer: C

241. What is a majority government?
A. The party in power holds at least half of the seats in the House of Commons and the Senate
B. The party in power holds at least half of the seats in the House of Commons
C. The party in power holds less than half of the seats in the House of Commons
D. The party in power holds at least half of the seats in the Senate
Answer: B

242. Which countries fought in the War of 1812?
A. United Kingdom and United States of America
B. France and United Kingdom
C. Canada and United States of America
D. France, Great Britain, and United States of America
Answer: A

243. Name three requirements you must meet in order to vote in a federal election.
A. Canadian citizen at least 21 years old and on the list of electors
B. Canadian citizen at least 18 years old and on the voters' list
C. Working for the government at least 18 years old and Canadian citizen
D. Canadian citizen at least 16 years old and on the list of voters
Answer: B

244. Which two provinces are on the Atlantic coast of Canada?
A. British Columbia and Yukon
B. Nova Scotia and New Brunswick
C. Newfoundland and British Columbia
D. Prince Edward Island and Ontario
Answer: B

245. How many provinces and territories are there in Canada?
A. Eight provinces and three territories
B. 10 provinces and two territories
C. Nine provinces and two territories
D. 10 provinces and three territories
Answer: D

246. Which of the following statements about residential schools is not true?
A. The federal government placed many Aboriginal children in residential schools to educate and assimilate them into mainstream Canadian culture
B. The schools were poorly funded and inflicted hardship on the students
C. The schools were welcomed by the Aboriginal people
D. Aboriginal language and cultural practices were mostly prohibited
Answer: C

247. Who have major responsibilities on First Nations reserves?
A. Band chiefs and councilors
B. Municipal governments
C. Provincial and territorial governments
D. Federal government
Answer: A

248. What important trade did the Hudson's Bay Company control?
A. Gold
B. Oil
C. Fishery
D. Fur
Answer: D

249. Who are exempted from the requirement of adequate knowledge of English or French in order to become a Canadian citizen?
A. Anyone who doesn't live in a major city
B. Any adult applicants who are 55 years of age and under
C. Any adult applicants who are 55 years of age and over
D. No one
Answer: C

250. Who played a key role in defending Canada during the war of 1812 and led a group of Shawnee warriors in support of British soldiers and Canadian volunteers?
A. Major General Sir Isaac Brock
B. Lieutenant Colonel Charles de Salaberry
C. Chief Tecumseh
D. Major General Robert Ross
Answer: C

251. Which of the following are the responsibilities of local government?
A. Education, foreign policy and transportation
B. Health care, natural resources, and transportation
C. National defense, health care, and transportation
D. Social and community health, snow removal, and transportation
Answer: D

252. What does the Canadian flag look like?
A. Red with a white maple leaf
B. Red and white with a bear
C. White with a red border on each end and a red maple leaf in the center
D. Red and white with provincial emblems
Answer: C

253. What does confederation mean?
A. The joining of provinces to become a new country
B. The United States Confederate Army came to settle in Canada
C. The combination of neighborhoods to build a larger community
D. The merger of colonies to form a province
Answer: A

254. In what year were the Aboriginal peoples granted the right to vote?
A. 1960
B. 1790
C. 1950
D. 1632
Answer: A

255. In which period did Canada's economy and industry experience a boom?
A. 1880s
B. 1890s and early 1900s
C. 1920s
D. 1860s
Answer: B

256. What are the three parts of Parliament?
A. The Queen or King, Governor General and Prime Minister
B. The Governor General, the Legislative Assembly, and the Senate
C. The Queen or King, the House of Commons, and the Senate
D. The House of Commons, the Legislative Assembly, and the Senate
Answer: C

257. Which two are Great Lakes?
A. St. Lawrence and Superior
B. Ontario and Okanagan
C. Michigan and Okanagan
D. Huron and Erie
Answer: D

258. What is known as the effort by women to achieve the right to vote?
A. The suffrage motion of women
B. The women's voting law
C. The election law
D. The women's suffrage movement
Answer: D

259. What do political parties do?
A. Follow commands from the king
B. Share ideas about how government should work
C. Plan for the celebration of Canada Day
D. Work with the local governments
Answer: B

260. Who were the United Empire Loyalists?
A. Inuit and First Nations
B. French and British settlers
C. First Nations and British settlers
D. Settlers from the United States during the American Revolution
Answer: D

261. What does the right to a secret ballot mean?
A. No one can watch you vote except the election officer
B. The voter should not tell anyone for whom he or she voted
C. Only the candidate you vote for can watch your marked ballot
D. No one can watch you vote or look at your marked ballot
Answer: D

262. Which province is Canada's largest producer of hydroelectricity?
A. British Columbia
B. Manitoba
C. Ontario
D. Quebec
Answer: D

263. Which territory shares a border with another country?
A. British Columbia
B. Alberta
C. Northwest Territories
D. Yukon Territory
Answer: D

264. Which four provinces first formed Confederation?
A. Ontario, Quebec, Nova Scotia, and New Brunswick
B. Ontario, Newfoundland, Quebec, and Nova Scotia
C. Ontario, Nova Scotia, New Brunswick, and British Columbia
D. Ontario, Quebec, Manitoba, and Nova Scotia
Answer: A

265. When was the Canadian Pacific Railway finished?
A. Late 1600s
B. Late 1700s
C. Late 1800s
D. Early 1700s
Answer: C

266. Who has the right to run as a candidate in federal elections?
A. Any person who is at least 18 years or older
B. Any Canadian citizen who is at least 18 years old
C. Canadian citizens and landed immigrants
D. A Canadian citizen who is 16 years or older
Answer: B

267. Under what conditions can you challenge the function or conduct of a police officer in Canada?
A. Never. Canadians cannot challenge them
B. Only their function, not their conduct
C. Only their conduct, not their function
D. If you consider this measure necessary (Note: The actual phrase is "if you feel you have been treated unfairly", answer D is closest in this context or implies the right exists)
Answer: D

268. How does a bill become a law?
A. Must be approved by the governors of each province
B. Must be approved by a majority in the House of Commons and Senate and received royal assent
C. Must be signed by the Queen or King
D. Must be approved by the members of the Parliament
Answer: B

269. Who are the Quebecers?
A. European settlers in the 1600s
B. Descendants of the French colonists
C. Descendants of the Anglophones
D. People of Quebec
Answer: D

270. Fatima is a new immigrant to Canada. Why can she choose to take a job like any man?
A. Because of the equality between French and English
B. Because she came from United Kingdom
C. Because of the equality of women and men in Canada
D. Because she has a university degree
Answer: C

271. Why is British Columbia known as Canada's Pacific gateway?
A. Because billions of dollars in goods are shipped to and from Asia
B. Because it has Pacific Ocean on its coastline
C. Because many people of Asian origin live there
D. Because it attracts many tourists all year round
Answer: A

272. When was the Magna Carta signed?
A. 1649
B. 1215
C. 1425
D. 1615
Answer: B

273. What does the Great Charter of Freedom include?
A. Aboriginal people's rights
B. Employment rights
C. Freedom of conscience and religion
D. Freedom from taxes
Answer: C

274. What is Habeas Corpus?
A. The right to live and work anywhere in Canada
B. The right for peaceful assembly
C. The right to speak freely
D. The right to challenge unlawful detention by the state
Answer: D

275. Who invented the snowmobile?
A. Alexander Graham Bell
B. Joseph-Armand Bombardier
C. Sir Sandford Fleming
D. Matthew Evans and Henry Woodward
Answer: B

276. Who out of the following is above the law in Canada?
A. Judges
B. Police
C. Politicians
D. No one
Answer: D

277. What are the three branches of the Canadian government?
A. Executive, Senate and Judicial
B. Executive, Legislative, and Monarchy
C. Executive, Police, and Judicial
D. Executive, Legislative, and Judicial
Answer: D

278. Under Canadian law, why is every person presumed to be innocent until proven guilty?
A. No person or group is above the law
B. Men and women are equal under the law
C. Freedom of thought, belief, opinion, and expression
D. To guarantee the due legal process under the law
Answer: D

279. Who governs Canada on a daily basis at the federal level?
A. The Premier
B. The Governor General
C. The King
D. The Prime Minister
Answer: D

280. What does the Canadian crown symbolize?
A. A Mari Usque Ad Mare
B. Symbols of England, France, Scotland, and Ireland
C. RCMP
D. Canada is a constitutional monarchy
Answer: D

281. Who is awarded the honor of Victoria Cross?
A. Canadian politicians
B. Police officers
C. Best innovation of the year
D. A Canadian showing conspicuous bravery or self-sacrifice
Answer: D

282. Federal elections are carried out to elect:
A. The Premier
B. The Prime Minister
C. The Member of Parliament
D. The Senator
Answer: C

283. What is a part of our heritage under the Canadian legal system?
A. Freedom under law
B. Democratic principles and due process
C. Rule of law
D. All of the above
Answer: D

284. What is Canada's largest city and main financial center?
A. Vancouver
B. Toronto
C. Montreal
D. Calgary
Answer: B

285. Which of the following describe two responsibilities of provincial or territorial government?
A. Policing and citizenship
B. Policing and firefighting
C. National defense and highways
D. Education and healthcare
Answer: D

286. Where do Inuit people live?
A. Ontario
B. Reserve land
C. In scattered communities across the Arctic
D. Prairie provinces
Answer: C

287. Who contributed to the invention of the radio and also sent the world's first wireless voice message?
A. Reginald Fessenden
B. Alexander Graham Bell
C. Mike Lazaridis
D. Matthew Evans
Answer: A

288. Which region was stormed and captured on D-Day, June 6th, 1944 by the Canadian troops?
A. Berlin
B. Juno Beach
C. London
D. Paris
Answer: B

289. Who invented the sport of basketball?
A. Canadians
B. French
C. Germans
D. Americans
Answer: A

290. What are the men who established Canada called?
A. Fathers of Confederation
B. Fathers of Dominion of Canada
C. Fathers of Canada
D. Fathers of Constitution
Answer: A

291. Which of the following describe two responsibilities of federal government?
A. National Defense and Foreign Policy
B. National Defense and Firefighting
C. Citizenship and maintaining highways
D. Healthcare and education
Answer: A

292. In which year was the British Parliament prohibited from buying and selling slaves?
A. 1793
B. 1877
C. 1807
D. 1833
Answer: C

293. Who became the first French Canadian prime minister since the formation of Confederation?
A. Sir John Alexander Macdonald
B. Sir Wilfrid Laurier
C. Sir George-Étienne Cartier
D. Sir Leonard Tilley
Answer: B

294. Which of the following is the highest court of Canada?
A. A provincial court
B. The small claims courts
C. The Supreme Court
D. The federal court
Answer: C

295. Who represents an electoral district?
A. The commissioner
B. The governor general
C. The lieutenant governor
D. A member of parliament
Answer: D

296. Which of the following was invented by Alexander Graham Bell?
A. Blackberry
B. Fax machine
C. Telephone
D. Internet
Answer: C

297. Which sport has the greatest number of registered players in Canada?
A. Lacrosse
B. Soccer
C. Curling
D. Basketball
Answer: B

298. What is celebrated on April 9th?
A. Vimy Day
B. Family day
C. Thanksgiving Day
D. Boxing Day
Answer: A

299. When was employment insurance introduced by the Canadian federal government?
A. 1947
B. 1950
C. 1940
D. 1965
Answer: C

300. What information can be found on a voter information card?
A. Confirms that your name is on the voter's list
B. States when you vote
C. States where you vote
D. All of the above
Answer: D

301. Which one of these is the Canadian icon?
A. The national flag
B. The crown
C. The snowbirds
D. The arms
Answer: C

302. What is due process?
A. The government must respect all of the legal rights a person is entitled to under the law
B. The rule of law and freedom under the law
C. The impartial manner in which the laws are administered
D. None of these
Answer: A

303. Who among the following can help you with legal problems?
A. Politicians
B. Lawyers
C. Members of Parliament
D. The police
Answer: B

304. To whom do we profess our loyalty in Canada?
A. The Canadian flag
B. A person who represents all Canadians (The Sovereign)
C. Geopolitical entities
D. The Canadian Constitution
Answer: B

305. What is the last line of our national anthem?
A. God keep our land glorious and free
B. The true north strong and free
C. O Canada, our home and native land
D. O Canada, we stand on guard for thee
Answer: D

306. The arms that can be seen on dollar bills contain symbols of:
A. Scotland and Ireland
B. England and France
C. Red maple leaves
D. All of the above
Answer: D

307. What are the members of the House of Commons also known as?
A. Commissioners
B. Members of Parliament or MPs
C. Members of the provincial parliament
D. None of these
Answer: B

308. Who were the United Empire loyalists?
A. People loyal to the crown
B. The commanders of armies
C. British colonies
D. Aboriginal peoples
Answer: A

309. Which of the following governments provides publicly funded education?
A. City government
B. Federal government
C. Provincial and territorial governments
D. None of these
Answer: C

310. When was Canada's first financial institution opened?
A. Early 16th century
B. Late 19th century
C. Late 18th and early 19th centuries
D. Early 18th century
Answer: C

311. The first leader of a responsible government in Canada in 1849 was:
A. Louis Riel
B. Sir John Alexander Macdonald
C. Sir Louis-Hippolyte La Fontaine
D. Alec Baldwin
Answer: C

312. Who are Francophones?
A. People speaking French as a first language
B. People who come from France
C. People who are learning French
D. People speaking French as a secondary language
Answer: A

313. Who recommended that upper and lower Canada be merged and given a responsible government?
A. Sir Guy Carleton
B. Lord Durham
C. Sir Louis-Hippolyte La Fontaine
D. Sir George-Étienne Cartier
Answer: B

314. How many Canadians served in World War II?
A. More than 1 million
B. Less than 500,000
C. About 900,000
D. About 500,000
Answer: A

315. What language do more than 3/4 of the people who live in Quebec speak?
A. French is their second language
B. French as their first language
C. German as their first language
D. English as their first language
Answer: B

316. What is the National Police Force of Canada?
A. The Royal Canadian Mounted Police (RCMP)
B. The Southeast Mounted Police
C. The Military Police
D. The Northwest Mounted Police
Answer: A

317. The name Canada became the official name of the country in the year:
A. 1799
B. 1773
C. 1791
D. 1867
Answer: C

318. How many levels of government are there in Canada?
A. 10
B. 5
C. 13
D. 3
Answer: D

319. When were female Canadian citizens over the age of 21 granted the right to vote in federal elections?
A. 1933
B. 1928
C. 1818
D. 1918
Answer: D

320. For how long was the title Dominion of Canada officially used?
A. 100 years
B. 250 years
C. 50 years
D. 200 years
Answer: A

321. How many judges serve in the Supreme Court of Canada?
A. 7
B. 9
C. 10
D. 5
Answer: B

322. Who was Sir Sam Steele?
A. A great frontier hero, mounted policeman and soldier of the queen
B. A military leader of the Metis in the 19th century
C. The first prime minister of Canada
D. The father of Manitoba
Answer: A

323. The largest religious affiliation in Canada is:
A. Roman Catholic
B. Hindu
C. Muslim
D. Jewish
Answer: A

324. Who suggested the name Dominion of Canada in 1864?
A. Sir Leonard Tilley
B. Lord Elgin
C. La Fontaine
D. Sir John Alexander Macdonald
Answer: A

325. What was significant about the Canadian Navy at the end of the Second World War?
A. It was the third largest navy in the world
B. It was the fourth largest navy in the world
C. It was the largest navy in the world
D. It was the second largest navy in the world
Answer: A

326. Which is the most famous invention of Research In Motion (RIM), a wireless communications company?
A. The Canadarm
B. The first wireless voice message
C. The BlackBerry
D. The iPhone
Answer: C

327. What are the Metis people a mixture of?
A. Aboriginal and European ancestry
B. European and American ancestry
C. American and Indian ancestry
D. Inuit and Indian ancestry
Answer: A

328. In 1996 at the Olympic Games, which Canadian became a world record sprinter and double Olympic gold medalist?
A. Wayne Gretzky
B. La Fontaine
C. Donovan Bailey
D. John Cabot
Answer: C

329. Which was the first province in the empire to move towards the abolition of slavery?
A. South Canada
B. Upper Canada
C. North America
D. Lower Canada
Answer: B

330. Which of the following lists contains four rights that Canadians have?
A. The right to go to school, to work, to have a bank account, and to travel
B. The right to be educated in either official language, to vote, to apply for a Canadian passport, and to enter and leave Canada freely
C. The right to travel, to live anywhere, to work anywhere, and to get married
D. The right to have a job, to vote, to drive, and to go to school
Answer: B

331. Which province is connected to mainland Canada by one of the longest continuous multi-span bridges in the world?
A. Prince Edward Island
B. Newfoundland and Labrador
C. Alberta
D. Ontario
Answer: A

332. Who invented the cardiac pacemaker?
A. Gabriel Dumont
B. Matthew Evans and Henry Woodward
C. Dr. John A. Hopps
D. Alexander Graham Bell
Answer: C

333. What is significant about the number of people living in Ontario?
A. They make up two-thirds of all Canadians
B. They make up three-quarters of all Canadians
C. They make up one-third of all Canadians
D. They make up half of all Canadians
Answer: C

334. When asked, who must you tell who you voted for in a federal election?
A. A police officer
B. Your employer
C. An elections Canada official
D. No one
Answer: D

335. Which province has a long history of coal mining, forestry, and agriculture?
A. Nova Scotia
B. New Brunswick
C. Prince Edward Island
D. Ontario
Answer: A

336. Who were the first Aboriginal people living in Canada?
A. American and British
B. Spanish
C. French and Chinese
D. First Nations and Inuits
Answer: D

337. If you are unable to vote on election day, how do you vote?
A. Vote at advance polls
B. Forget it
C. Vote the next day after the election
D. Vote a week later
Answer: A

338. What is the first line of the Canadian national anthem?
A. O Canada, our home and native land
B. O Canada, land of our ancestors
C. O Canada, we stand on guard for thee
D. O Canada, glorious and free
Answer: A

339. What song is Canada's national anthem?
A. God Save the Queen or King
B. O Canada
C. Oh Canada
D. Great Canada
Answer: B

340. Which of the following people is the father of confederation?
A. Stephen Harper
B. Pierre Trudeau
C. Alexander Mackenzie
D. Sir John Alexander Macdonald
Answer: D

341. What is the meaning of the phrase "the world's longest undefended border"?
A. Canada exports billions of dollars worth of energy products to the USA
B. Canada enjoys close relations with the United States
C. Over three-quarters of Canadian exports are destined for the USA
D. Millions of Canadians and Americans cross the border every year in safety
Answer: D

342. When was the first representative assembly in Canada elected?
A. 1791
B. 1758
C. 1889
D. 1609
Answer: B

343. Which of the following are the provinces responsible for?
A. Defense
B. Foreign policy
C. Currency
D. Education
Answer: D

344. How is Canada ranked in terms of geographical size in the world?
A. It is the largest country on Earth
B. It is the second largest country on Earth
C. It is the third largest country on Earth
D. It is the seventh largest country on Earth
Answer: B

345. When is Labor Day celebrated in Canada?
A. The 1st of July
B. The 1st Monday of September
C. The 1st of May
D. The 3rd Monday of October
Answer: B

346. What did the government do to make immigration to Western Canada easier?
A. Use the Great Lakes and Seaway to prairies
B. Built a railway across the prairies
C. Built a highway across the prairies
D. A and C
Answer: B

347. What are the three main groups of Aboriginal peoples?
A. Métis, Inuit, and United Empire Loyalists
B. Acadians, Métis and First Nations
C. Early French settlers, Métis and Indian
D. Métis, First Nations and Inuit
Answer: D

348. Which trade spread across Canada making it important to the economy for over 300 years?
A. Beaver fur trade
B. Fisheries
C. Lumber
D. Gold
Answer: A

349. What does the Governor General perform?
A. After an election, he or she invites the party with the most votes to form the new government
B. Signs bills to make them law
C. All of the above
D. None of the above
Answer: C

350. When was the official languages act passed?
A. 1969
B. 1867
C. 1982
D. 2000
Answer: A

351. What does BNA stand for?
A. British National Alliance
B. British North America Act
C. Black Nation Alliance
D. Bank of National Association
Answer: B

352. How many levels of government are there in Canada?
A. 10
B. 5
C. 13
D. 3
Answer: D

353. How are laws passed?
A. Signed by the Governor General
B. Read by the House of Commons three times
C. Read by the Senate three times
D. All of the above
Answer: D

354. What does official language rights and minority language educational rights mean?
A. English is more important than French in Canada
B. French is more important in Quebec and English is more important in other provinces
C. All languages have equal status in Canada's government
D. French and English have equal status in Parliament and throughout the government
Answer: D

355. From whom is Canada's tallest mountain named?
A. William Logan
B. Louis Riel
C. Terry Fox
D. Wayne Gretzky
Answer: A

356. Who signs the bills to make them law?
A. The police chief
B. The Governor General
C. The premier
D. The prime minister
Answer: B

357. What is a noble way to contribute to Canada and an excellent career choice?
A. Serve in the regular Canadian forces
B. Serve on a jury
C. Belong to a union
D. Learn both official languages
Answer: A

358. Which province is Canada's leading wheat producer?
A. Manitoba
B. New Brunswick
C. Alberta
D. Saskatchewan
Answer: D

359. What does a member of parliament do?
A. He or she links Canadians to the federal government
B. He or she represents the king
C. He or she works for the governor general
D. He or she liaises with the municipal government
Answer: A

360. Which of the following are Canada's famous writers?
A. Sir Ernest MacMillan and Healey Willan
B. Paul Henderson and Mark Tewksbury
C. Joy Kogawa, Michael Ondaatje and Rohinton Mistry
D. Emily Carr and Louis-Philippe Hébert
Answer: C

361. Sir Louis-Hippolyte La Fontaine was known for:
A. A champion of democracy and Aboriginal rights
B. A champion of democracy and French language rights and the first leader of a responsible government in Canada
C. The first head of state
D. The first French-speaking prime minister
Answer: B

362. What document made Confederation legal?
A. The Immigration Act
B. The British North America Act
C. The Citizenship Act
D. The Charter of Rights and Freedoms
Answer: B

363. Which port is the largest and busiest in Canada?
A. The Port of Halifax
B. The Port of Montreal
C. The Port of Vancouver
D. The Port of Victoria
Answer: C

364. What did the Canadian Pacific Railway symbolize?
A. Easy access to the west coast
B. What can be achieved by working together
C. Unity
D. Ribbons of steel
Answer: C

365. What part of the Constitution legally protects basic rights and freedom of Canadians?
A. The Canada Charter of Responsibilities
B. The Charter of Rights and Freedoms
C. The Canadian Charter of Rights and Freedoms
D. The Canadian Charter of Rights and Free Will
Answer: C

366. Who started the Marathon of Hope?
A. Rick Hansen
B. James Naismith
C. Sir Steele
D. Terry Fox
Answer: D

367. What are some of the rights and privileges of a Canadian citizen?
A. The right to be a candidate
B. The right to vote in federal, provincial, and territorial elections
C. The right to enter, remain in, or leave Canada
D. All of the above
Answer: D

368. How many votes can a voter have in a federal election?
A. It does not matter
B. 3
C. 2
D. 1
Answer: D

369. How much of Canadian exports are destined for the USA?
A. Over 1/3
B. Over 3/4
C. 2/3
D. Half
Answer: B

370. Where do you go to vote?
A. Polling station
B. City Hall
C. Police station
D. Fire station
Answer: A

371. As what have poets and songwriters hailed Canada?
A. Peace, order, and good government
B. The great outdoors
C. The Great Dominion
D. The land of the brave
Answer: C

372. Where did the early European settlers live?
A. Western Canada
B. Northwest Canada
C. Northern Canada
D. Eastern and Central Canada
Answer: D

373. Canadians work hard to respect?
A. Marxism
B. Pluralism
C. Capitalism
D. Individualism
Answer: B

374. Which of the following was a key phrase in the British North America Act, Canada's original constitutional document in 1867?
A. Geopolitical entity
B. Trade and communications
C. Peace, order, and good government
D. Discipline, education, and good public
Answer: C

375. Today, diversity enriches the lives of Canadians. Where is diversity reflected the most?
A. Countryside areas
B. Cities
C. Towns
D. Mountains
Answer: B

376. What does the MLA stand for?
A. Member of Legal Aid
B. Member of the Legislative Assembly
C. Member of Land Association
D. Member of Land Aid
Answer: B

377. Who do provincial members of the legislative or national assemblies represent?
A. Federal and provincial governments
B. Everyone who lives in the federal electoral district
C. Everyone who lives in the provincial or territorial electoral district
D. Everyone who lives in the municipal electoral district
Answer: C

378. What is a ballot?
A. A form that tells you when and where to vote
B. A dance
C. A form for voting
D. A form to count the number of votes
Answer: C

379. Who elects the members to the House of Commons in Ottawa and to the provincial and territorial legislatures?
A. The government employees
B. The government
C. The prime minister
D. The people
Answer: D

380. Name two important documents that describe our rights and freedoms.
A. The Canadian Constitution and English Common Law
B. The Civil Code of France and the Canadian Constitution
C. The Canadian Charter of Rights and Freedoms and Magna Carta
D. Laws passed by Parliament and English Common Law
Answer: C

381. What is the final step before a bill becomes law?
A. Approved by the king
B. Approved by the prime minister
C. Approved by the Governor General (Royal Assent)
D. Approved by a judge
Answer: C

382. When you vote on election day, what do you do?
A. Go to the voting station, tell them who you are, and mark your X
B. Go to the voting station, remove one ballot, mark your X, and deposit it
C. Go to the voting station, take your voter's card with ID, highlight choice, deposit it
D. Go to the voting station, take voter card and ID, mark an X next to candidate, fold ballot, present to official to tear off number, deposit in box
Answer: D

383. Which of the following criteria give a Canadian the right to vote?
A. Owning a house
B. Being on an official voters' list
C. Having a driver's license
D. Being an immigrant
Answer: B

384. Which legal documents protect the rights of Canadians with regards to the official languages?
A. British Charter of Rights and Freedoms
B. Canadian Constitution and Official Languages Act
C. Canadian Languages Act
D. Official English Act
Answer: B

385. What is the government responsible for all of Canada called?
A. The National Assembly
B. The Legislature
C. The Federal Government
D. The Council
Answer: C

386. What is the most popular spectator sport of Canada?
A. Soccer
B. Canadian football
C. Hockey
D. Basketball
Answer: C

387. Which of the following represents protecting and enjoying the heritage and environment in Canada?
A. Government responsibilities
B. Citizenship responsibilities and the laws of Canada
C. Laws of Canada
D. Citizenship responsibilities
Answer: D

388. Who are the Quebecers?
A. All the French-speaking people in Canada
B. They form a nation within a united Canada
C. They are descendants of British settlers who live in Quebec
D. They are the Canadians who only speak French
Answer: B

389. Approximately how many Canadians served in the First World War?
A. About 170,000
B. About 10,000
C. More than 60,000
D. More than 600,000
Answer: D

390. When must federal elections be held?
A. Whenever the prime minister calls the election
B. About every four years
C. When the MPs want a new prime minister
D. On the third Monday in October every four years following the most recent general election
Answer: D

391. Which phrase embodied the vision for the dominion of Canada?
A. The land of the strong and free
B. Dominion from sea to sea and from the river to the ends of the earth
C. Dominion from ocean to ocean
D. O Canada, my home and native land
Answer: B

392. How are your rights and freedoms protected?
A. By the Charter of Rights and Freedoms
B. By the King
C. By citizenship
D. None of the above
Answer: A

393. Which of the following statements is true regarding Canada's membership in international organizations?
A. Canada is a founding member of the United Nations but not of NATO
B. Canada is a founding member of NATO but not of the United Nations
C. Canada is a founding member of both the United Nations and NATO
D. Canada is not a founding member of either
Answer: C

394. Who do Canadians vote for in a federal election?
A. A candidate whom they want to represent them in parliament
B. All candidates in their electoral district
C. The best speaker running the election campaign
D. Someone to become the premier of the province
Answer: A

395. What year was Confederation?
A. 1867
B. 1768
C. 1876
D. 1786
Answer: A

396. Which of the following is the responsibility of the federal government?
A. Highways
B. Currency
C. Health
D. Education
Answer: B

397. What is an electoral district?
A. A geographical area where the politicians reside
B. An area where politicians work
C. A geographical area represented by a member of the House of Commons
D. The area where voting takes place in your locality
Answer: C

398. What is the capital city of Canada?
A. Ottawa
B. Victoria
C. Toronto
D. Ontario
Answer: A

399. What did the fathers of Confederation do to establish Canada?
A. They worked together to create a new country, the Dominion of Canada
B. They were explorers who organized an expedition to survey northern Canada
C. They formed a republic state in Canada
D. They were a group of politicians who attempted to join Canada to the United States
Answer: A

400. Which province is the most easterly point in Canada?
A. Prince Edward Island
B. New Brunswick
C. Nova Scotia
D. Newfoundland and Labrador
Answer: D

401. Where is Canada's largest naval base located?
A. Vancouver
B. Quebec City
C. Halifax
D. Toronto
Answer: C

402. Which one of the following is the most populated province in Canada?
A. Quebec
B. British Columbia
C. Ontario
D. Alberta
Answer: C

403. Why did thousands of miners come to the Yukon in the 1890s?
A. To build the Yukon Railway
B. For the gold rush
C. Because of the discovery of oil
D. To build the Pacific Railway
Answer: B

404. Julia is a descendant of French colonists in the maritime province. What is she called?
A. Métis
B. Acadian
C. Inuit
D. Indian
Answer: B

405. Which of the following symbolizes close ties between Canada and the US?
A. The Peace Arch in Blaine, Washington
B. Statue of Liberty in New York
C. International Peace Garden crossing between Canada and the United States
D. White Pass in Yukon
Answer: A

406. When did Canada's modern energy industry begin?
A. The economic boom of the 1890s and early 1900s
B. After the War of 1812
C. Since the discovery of oil in Alberta in 1947
D. After the Second World War
Answer: C

407. Who was the first female member of Parliament?
A. Agnes Macphail
B. Mary Ann Shadd Cary
C. Laura Secord
D. Alice Munro
Answer: A

408. The Peace Tower was built in memory of:
A. The First World War
B. The Second World War
C. The Korean War
D. The Battle of the Plains of Abraham
Answer: A

409. In 1939, Canada joined with its democratic allies to fight:
A. The USA
B. Japan
C. The Nazis
D. Korea
Answer: C

410. How many Canadians have died in wars till now?
A. 60,000
B. 110,000
C. More than 1 million
D. 40,000
Answer: B

411. Name a Canadian heroine who warned James FitzGibbon of a planned American attack during the War of 1812.
A. Agnes Macphail
B. Mary Ann Shadd Cary
C. Laura Secord
D. Alice Munro
Answer: C

412. In what year did Newfoundland and Labrador join Canada?
A. 1867
B. 1955
C. 1949
D. 1880
Answer: C

413. What was made in 1927 after World War I?
A. The National War Memorial in Ottawa
B. The Peace Arch between the United States and Canada
C. The CN Tower in Toronto
D. The Peace Tower
Answer: D

414. Can you send someone else or skip your duty if you are called to serve on a jury?
A. Yes, you can send your spouse to serve on your behalf
B. No. Jury duty is a responsibility of citizenship that cannot be transferred or skipped
C. Yes, you can skip jury duty if you inform the court in advance
D. No, but you can hire someone to serve on the jury for you
Answer: B
`;

export const parseQuestions = (): Question[] => {
  // Normalize line endings
  const cleanData = RAW_DATA.replace(/\r\n/g, '\n');
  
  // Split by double newlines to roughly separate questions
  // However, the source format is a bit loose, so we'll use a more robust regex approach.
  const questions: Question[] = [];
  
  // Regex Explanation:
  // 1. (\d+)\. (.*) -> Captures ID and Question Text
  // 2. A\. (.*) -> Option A
  // 3. B\. (.*) -> Option B
  // 4. C\. (.*) -> Option C
  // 5. D\. (.*) -> Option D
  // 6. Answer: ([A-D]) -> Answer Key
  
  const chunks = cleanData.split(/\n(?=\d+\.)/g);

  chunks.forEach((chunk) => {
    if (!chunk.trim()) return;

    const idMatch = chunk.match(/^(\d+)\.\s+(.*)/);
    const optionAMatch = chunk.match(/A\.\s+(.*)/);
    const optionBMatch = chunk.match(/B\.\s+(.*)/);
    const optionCMatch = chunk.match(/C\.\s+(.*)/);
    const optionDMatch = chunk.match(/D\.\s+(.*)/);
    const answerMatch = chunk.match(/Answer:\s+([A-D])/);

    if (idMatch && optionAMatch && optionBMatch && optionCMatch && optionDMatch && answerMatch) {
      const letterToIndex: Record<string, number> = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
      
      questions.push({
        id: parseInt(idMatch[1], 10),
        question: idMatch[2].trim(),
        options: [
          optionAMatch[1].trim(),
          optionBMatch[1].trim(),
          optionCMatch[1].trim(),
          optionDMatch[1].trim()
        ],
        correctAnswerIndex: letterToIndex[answerMatch[1].trim()[0]] || 0,
        rawAnswerText: answerMatch[1].trim()
      });
    }
  });

  return questions;
};